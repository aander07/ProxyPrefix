$(function(){
    var proxy = "proxy.example.edu"

    test("Plugin loaded", 1, function() {
        ok(jQuery().ProxyPrefix());
    });

    test("Proxy URL", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?url=http://example.com/">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F' );
    });

    test("Proxy URL with fragment", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?url=http://example.com/#fragment">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%23fragment' );
    });


    test("Proxy QURL", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?qurl=http://example.com/">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F' );
    });

    test("Proxy QURL with fragment", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?qurl=http://example.com/#fragment">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%23fragment' );
    });

    test("Proxy QURL with encoded fragment", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?qurl=http://example.com/%23fragment">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%23fragment' );
    });

    test("Encoded Proxy QURL", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F' );
    });

    test("Encoded Proxy QURL with fragment", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%23fragment">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%23fragment' );
    });

    test("Form action", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<form action="http://example.com/#fragment"></form>');
        console.log( $( fixture.children('form') ) );
        fixture.children('form').ProxyPrefix( { hostnames: new Array( proxy ), attribute: 'action' } );
        console.log( $( fixture.children('form') ) );
        equal( fixture.children('form').attr('action'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%23fragment' );
    });


});
// vim: expandtab:ts=4:
