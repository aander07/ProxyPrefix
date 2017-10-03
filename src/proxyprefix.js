/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright (C) 2013 Andrew Anderson <andrew@lirn.net>
 */

(function ( $, window, document, undefined ) {

    $.error = function( msg ) {
        if ( window.console !== undefined ) {
            console.error( msg );
        }
    };

    // Create the defaults once
    var pluginName = "ProxyPrefix";
        defaults = {
            // name of element attribute to modify
            attribute : 'href',
            // URL schemes that can be proxied
            protocols : new Array( 'http', 'https' ),
            // A proxy cluster with the shared DNS name and two individual node names
            hostnames : new Array(),
            // The URL on the proxy server used as an entry point
            loginpath : '/login',
            // A list of query parameters to be stripped from URLs, by web site
            remove    : {
                'web.ebscohost.com': new Array( 'sid' )
            },
            // A list of query parameters to be added to URLs, by web site
            append    : {
                'search.ebscohost.com': { 
                        'auth': 'uid',
                        'user': 'libraryresearch',
                        'password': 'libraryresearch'
                }
            }
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {
            // Normalize the URL to AvOiD MiXeD CaSe StrING COMariSON
            var uri = URI( $( this.element ).attr( this.options.attribute ) ).normalize();
            // Perform validation first to avoid doing all the processing 
            // just to throw it away at the end
            if ( this.validate(this.element, this.options, uri) === false ) {
                return false;
            }
            // Strip out parameters (primarily session IDs) that will not be valid
            // in future visits to the proxied site
            this.remove_param(this.element, this.options, uri);
            // Add parameters (mainly authentication data) that will be needed
            // in future visits to the proxied site
            this.append_param(this.element, this.options, uri);

            var found = false;
            var options = this.options;
            $.each( options.hostnames, function( key, value ) {
                // Look to see if the URLs appears to be already setup for proxying
                if ( uri.host() === value && uri.pathname() === options.loginpath ) {
                    found = true;
                    if ( key === 0 ) {
                        // Nothing to do, the URL appears properly formatted
                        return false;
                    } else {
                        // The URL is pointed to one of the alias names, set it to the
                        // main DNS name instead
                        uri.host( options.hostnames[0] );
                        return false;
                    }
                }
            });

            if ( found === true ) {
                // This was a proxied link, rewrite it to ensure it is in a sane format
                this.rewrite(this.element, this.options, uri);
            } else {
                // This was a raw link, just add the proxy prefix
                this.prefix(this.element, this.options, uri);
            }
            return this;
        },

        validate: function(el, options, uri) {
            // Not all browsers do HTML5 URL type handling the same, so add a sane
            // value for the URL's protocol if one was not provided
            if ( uri.protocol() === '' ) {
                uri.protocol( 'http' );
            }
            // Check if the protocol is supported by the proxy server
            if ( this.options['protocols'].indexOf( uri.protocol() ) < 0 ) {
                $.error( 'Unsupported protocol: ' + uri.protocol() );
                return false;
            }
            // Check that it was not a URN (mailto, etc.) (See RFC 3986)
            if ( uri.is('urn') === true ) {
                $.error( 'The proxy address must be a URL.  A URN was given instead.' );
                return false;
            }
            // Proxy by hostname is the only mode supported.
            if ( uri.is('IP') || uri.is('IPv4') || uri.is('IPv6') ) {
                $.error( 'The proxy address must be a hostname.  ' + 
                         'IP addresses are not valid.' );
                return false;
            }
            return true;
        },

        remove_param: function(el, options, uri) {
            // Remove any parameters for this web site that will impede future 
            // visitors from successfully accessing the URL.  Typically this will
            // be session data in the URL.
            try {
                $.each( this.options.remove[ uri.host() ], function( key, value ) {
                    if ( uri.hasSearch( value ) ) {
                        uri.removeSearch( value );
                    }
                });
            } catch ( err ) {}
            $( el ).attr( options.attribute, uri.href() );
        },

        append_param: function(el, options, uri) {
            // Add any parameters for this web site that are required for successful
            // access to the site.  Typically this will be any required authentication
            // data.
            try {
                $.each( this.options.append[ uri.host() ], function( key, value ) {
                    if ( uri.hasSearch( key ) === false ) {
                        uri.addSearch( key, value );
                    }
                });
            } catch ( err ) {}
            $( el ).attr( options.attribute, uri.href() );
        },

        extract_qurl: function(el, options, uri) {
            return this.extract( el, options, uri, 'qurl' );
        },

        extract_url: function(el, options, uri) {
            return this.extract( el, options, uri, 'url' );
        },

        extract: function(el, options, uri, param) {
            // Helper function to extract the URL parameter from an already proxied URL
            var datamap = uri.search( true );
            // Decode this to pick up any embedded fragments
            var quri = URI( URI.decode( datamap[ param ] ) ); 
            // Preserve the HTML fragment
            if ( uri.fragment() !== '' ) {
                if ( quri.path() !== "undefined" ) {
                    quri.fragment( uri.fragment() );
                }
            }
            return quri;
        },

        rewrite: function(el, options, uri) {
            // Rebuild the URL to ensure that the proxy data is sane.  This is
            // neeeded when the alias name is used instead of the main DNS 
            // name is used in the link.  This is common in cut-and-paste
            // scenarios and vendor permalinks.
            var target = URI({
                protocol: uri.protocol(), // Use the same protocol as the resource
                hostname: options.hostnames[0],
                path: options.loginpath
            });
            // Try to pull the qurl query parameter from the proxy url
            var qurl =  this.extract_qurl( this.element, this.options, uri ).href();
            // Try to pull the url query parameter from the proxy url
            if ( qurl === "undefined" ) {
                qurl =  this.extract_url( this.element, this.options, uri ).href();
            }
            // Punt
            if ( qurl === "undefined" ) {
                $.error( 'Unable to extract proxy URL: ' );
            }
            target.addQuery( { qurl : qurl } );
            $( this.element ).attr( this.options.attribute, target.href() );
        },

        prefix: function(el, options, uri) {
            // Assume Proxy By Host until we can prove otherwise
            var rewriteByHost = true;
            var rewriteByPath = false;

            // Add the proxy prefix to the URL.  Start by looking for the proxy
            // hostname within the URL (cut-and-paste from the location bar in
            // the browser or permalinks from some vendors)
            var offset = uri.host().indexOf( options.hostnames[0] );
            if ( offset > 0 ) {
                // Also remove the leading '.' that separates the vendor web site
                // from the proxy hostname
                uri.host( uri.host().slice( 0, offset - 1 ) );

                // Strip off leading session & server information for rewriteByHost
                offset = uri.host().indexOf( '.http.' );
                if ( offset > 0 ) {
                    uri.host( uri.host().slice( offset + 6 ) );
                }
                offset = uri.host().indexOf( '-https-' );
                if ( offset > 0 ) {
                    uri.host( uri.host().slice( offset + 7 ) );
                }

                // If the hostname has a '.' (e.g. vendor.com), then it was a
                // ProxyByPath hostname, and does not need to be rewritten.
                // Otherwise, the name contains no '.'s and needs to be
                // processed to convert the '-'s back to '.'s for https URIs
                if ( uri.protocol() === 'https' && uri.host().search(/\./) < 1 ) {
                    uri.host( uri.host().replace( /-/g, '.') );

                    // Muse Proxy adds an extra '-' if a hostname includes
                    // a '-' in the original hostname; detect this case
                    // and cleanup (the "ABC-CLIO" case), since no valid
                    // hostname should have ".." in it
                    uri.host( uri.host().replace( /\.\./, '-') );

                    // XXX: waiting to hear back from OCLC on how EZproxy
                    // handles this, since it does not duplicate the '-'
                    // in the hostname, but keeps a single '-' value instead

                    // Hack this work-around in place for now for known
                    // corner cases with EZproxy URL handling
                    uri.host( uri.host().replace( /databases\.abc\.clio\.com/, 'databases.abc-clio.com' ) );
                }

            } else {
                // Proxy hostname was not in the uri, assume Proxy By Path instead
                rewriteByHost = false;
                rewriteByPath = true;
            }

            // Look for Proxy By Path elements
            if ( rewriteByPath === true ) {
                var segmentArray = uri.segment();
                for ( var idx = 0; idx < segmentArray.length; idx++) {
                    if ( segmentArray[ idx ].startsWith( 'MuseProtocol' ) ) {
                        uri.protocol( segmentArray[ idx ].split('=')[1] );
                    }
                    if ( segmentArray[ idx ].startsWith( 'MuseHost' ) ) {
                        uri.host( segmentArray[ idx ].split('=')[1] );
                    }
                    if ( segmentArray[ idx ] === 'MusePath' ) {
                        uri.path( segmentArray.slice( idx + 1 ).join('/') );
                    }
                }
            }

            var target = URI({
                protocol: uri.protocol(), // Use the same protocol as the resource
                hostname: options.hostnames[0],
                path: options.loginpath
            });
            target.addQuery( { qurl : uri.href() } );
            $( el ).attr( options.attribute, target.href() );
        }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
// vim: expandtab:ts=4:
