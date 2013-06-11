# ProxyPrefix #

Time and again, there are threads on library mailing lists asking for a tool
that will allow easy creation of proxied URLs.  There are many questions, but
few answers, especially answers that are not tied into a specific content
management solution.

EZproxy took a half step with the /encode_url functionality.  This allows 
you to paste a URL and have it properly quoted to add to the proxy
login URL.  But this does not go far enough.  What happens when the database
vendor uses a session ID in its URL?  Or what happens if you need to add
credentials or entry point data to the URL?  The /encode_url feature does
nothing to address either of these issues.

With ProxyPrefix, there is now a front-end solution available that does 
not care if it is being run on a static page, served from a LMS, or any 
other server backend technology (PHP, Java, Python, Perl, ASP, etc).

You start with a simple list of resources on a web page.  How the links 
are inserted into the web page is immaterial:

```html
Online Resources:
<ul>
<li><a href="http://books.google.com">Google Books</a></li>
<li><a href="http://www.ncbi.nlm.nih.gov/pubmed">PUBMED</a></li>
<li><a href="http://www.ipl.org">Internet Public Library</a></li>
</ul>
```

To convert these into proxied links, historically you would need to manually add a 
proxy prefix to each and every URL.

You would also have to worry about encoding any special characters (`?`, `&`, and `#`) 
that may be in the URL, to ensure that the proxy server does not consume those 
parameters as part of the login processing.  You eventually wind up with a page 
that starts looking more like this:

```html
Online Resources:
<ul><li><a href="http://proxy.example.edu/login?qurl=http%3A%2F%2Fbooks.google.com%2F">Google Books</a></li>
<li><a href="http://proxy.example.edu/login?qurl=http%3A%2F%2Fwww.ncbi.nlm.nih.gov%2Fpubmed">PUBMED</a></li>
<li><a href="http://proxy.example.edu/login?qurl=http%3A%2F%2Fwww.ipl.org">Internet Public Library</a></li
>
</ul>
```

Go ahead, take a minute to de-glaze your eyes after looking at that.

Instead of all that headache, ProxyPrefix allows you to simply add one line of 
JavaScript to your page instead:

```html
Online Resources:
<ul>
<li><a href="http://books.google.com">Google Books</a></li>
<li><a href="http://www.ncbi.nlm.nih.gov/pubmed">PUBMED</a></li>
<li><a href="http://www.ipl.org">Internet Public Library</a></li>
</ul>
```

```javascript
$('a').ProxyPrefix();
```

No server-side changes required, all of the changes to the anchor href attribute 
happen on the fly in the browser instead.

## Demo ##

A [demonstration](demo.html) page is available.  In the demo, a simple form
allows the proxy server name to be specified, accepts a URL to an online
resource.  After encoding the URL, you can then test that the URL functions 
correctly, using the `Test` button to open the resource via the proxy server.

## Using ProxyPrefix ##

`ProxyPrefix` is built as a [jQuery](http://www.jquery.com/) Plugin, and 
uses the [URIjs](medialize.github.io/URI.js/) library for URI parsing.

## Examples ##

```javascript
$('a').ProxyPrefix();
```

### hostnames ###

This will apply the default options to all HTML anchor elements on the page.

```javascript
$('a').ProxyPrefix( { hostnames: new Array( 
	'proxy.example.edu', 
	'proxy1.example.edu', 
	'proxy2.example.edu'} 
);
```

This will set the list of proxy servers used.  NOTE: the first proxy server
listed is the default proxy server, and will be used to generate the hostname
portion of the proxy prefix.

### loginpath ###

```javascript
$('a').ProxyPrefix( { loginpath: '/sso/login' } );
```

This will set the path portion of the proxy prefix to `/sso/login`.

### attribute ###

```javascript
$('form').ProxyPrefix( { attribute: 'action' } );
```

The default options are designed to work against HTML anchors (`<a>` elments 
in the web age), but can be adapated to work against HTML forms as well.  Any
web page element that can be changed using the jQuery .attr() function can
be used with `ProxyPrefix`.

### protocols ###

```javascript
$('a').ProxyPrefix( { protocols: new Array( 'http', 'https', 'gopher' ) } );
```

This will set the protocols that your proxy server can service.  If a protocol
is encountered that is not in this array, the $.error() method is called and
the URL is skipped.

### remove ###

```javascript
var remove_options = {
    'web.ebscohost.com': new Array( 'sid' )
}
$('a').ProxyPrefix( { remove: remove_options } );
```

The `remove` paramter spcifies an array where the keys are the hostname for the
database, and the values are the names of query parameters that will be 
stripped from the URL.  In this case, the `sid` parameter is being removed,
since it represents a session identifier that is not valid for future sessions.

### append ###

```javascript
var append_options = {
 'search.ebscohost.com': {
   'auth': 'uid',
   'user': 'libraryresearch',
   'password': 'libraryresearch'
  }
}
$('a').ProxyPrefix( { append: append_options } );
```

The `append` paramter spcifies an array where the keys are the hostname for the
database, and the values are the names of query parameters that will be 
added to the URL.  In this case, the `auth`, `user`, and `password` parameters 
are being added, since they are required for successful authentication to the
service.
