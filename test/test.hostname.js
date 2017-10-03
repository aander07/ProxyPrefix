$(function(){
    var proxy = "proxy.example.edu";

    QUnit.module( "Hostname Tests" );

    QUnit.test( "Plugin loaded", function( assert ) {
        assert.ok(jQuery().ProxyPrefix());
    });

    QUnit.test( "HTTP Proxy Hostname", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append( '<a href="http://search.proquest.com.proxy.example.edu/abicomplete">ProQuest URL</a>' );
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fsearch.proquest.com%2Fabicomplete' );
    });

    QUnit.test( "HTTPS Proxy Hostname", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append( '<a href="https://search-proquest-com.proxy.example.edu/abicomplete">ProQuest URL</a>' );
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fsearch.proquest.com%2Fabicomplete' );
    });

    QUnit.test( "HTTPS Dashed Proxy Hostname", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append( '<a href="https://databases-abc-clio-com.proxy.example.edu/">ABC-CLIO URL</a>' );
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fdatabases.abc-clio.com%2F' );
    });


    QUnit.test( "HTTP PROXY_BY_HOSTNAME True)", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append( '<a href="http://123456789.mp99.a.http.find.galegroup.com.proxy.example.edu/menu/commonmenu.do">Gale URL</a>' );
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Ffind.galegroup.com%2Fmenu%2Fcommonmenu.do' );
    });

    QUnit.test( "HTTPS PROXY_BY_HOSTNAME True", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append( '<a href="https://123456789-mp99-a-https-search-proquest-com.proxy.example.edu/">ProQuest URL</a>' );
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fsearch.proquest.com%2F' );
    });

    QUnit.test( "HTTPS Dashed PROXY_BY_HOSTNAME True", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append( '<a href="https://123456789-mp99-a-https-databases-abc--clio-com.proxy.example.edu/">ABC-CLIO URL</a>' );
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fdatabases.abc-clio.com%2F' );
    });


    QUnit.test( "HTTP PROXY_BY_HOSTNAME False)", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append( '<a href="http://proxy.example.edu/MuseProxyID=mp99/MuseSessionID=123456789/MuseProtocol=http/MuseHost=www.booksinprint.com/MusePath/">BIP URL</a>' );
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fwww.booksinprint.com%2F' );
    });

    QUnit.test( "HTTPS PROXY_BY_HOSTNAME False)", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append( '<a href="https://proxy.example.edu/MuseProxyID=mp99/MuseSessionID=123456789/MuseProtocol=https/MuseHost=my.apa.org/MusePath/apa/idm/login.seam">APA URL</a>' );
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fmy.apa.org%2Fapa%2Fidm%2Flogin.seam' );
    });

    QUnit.test( "HTTPS Dashed PROXY_BY_HOSTNAME False)", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append( '<a href="https://proxy.example.edu/MuseProxyID=mp99/MuseSessionID=123456789/MuseProtocol=https/MuseHost=databases.abc-clio.com/MusePath/">ABC-CLIO URL</a>' );
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fdatabases.abc-clio.com%2F' );
    });
 
});
// vim: expandtab:ts=4:
