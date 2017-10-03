$(function(){
    var proxy = "proxy.example.edu";

    QUnit.module( "Prefix Tests" );

    QUnit.test( "Plugin loaded", function( assert ) {
        assert.ok(jQuery().ProxyPrefix());
    });

    QUnit.test( "HTTP Proxy URL", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?url=http://example.com/">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F' );
    });

    QUnit.test( "HTTP Proxy URL with fragment", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?url=http://example.com/#fragment">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%23fragment' );
    });

    QUnit.test( "HTTP Proxy QURL", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?qurl=http://example.com/">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F' );
    });

    QUnit.test( "HTTP Proxy QURL with fragment", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?qurl=http://example.com/#fragment">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%23fragment' );
    });

    QUnit.test( "HTTP Proxy QURL with encoded fragment", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?qurl=http://example.com/%23fragment">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%23fragment' );
    });

    QUnit.test( "HTTP Encoded Proxy QURL", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F' );
    });

    QUnit.test( "HTTP Encoded Proxy QURL with fragment", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%23fragment">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%23fragment' );
    });

    QUnit.test( "HTTP Form action", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<form action="http://example.com/#fragment"></form>');
        console.log( $( fixture.children('form') ) );
        fixture.children('form').ProxyPrefix( { hostnames: new Array( proxy ), attribute: 'action' } );
        console.log( $( fixture.children('form') ) );
        assert.equal( fixture.children('form').attr('action'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%23fragment' );
    });

    QUnit.test( "HTTPS Proxy URL", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="https://proxy.example.edu/login?url=https://example.com/">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fexample.com%2F' );
    });

    QUnit.test( "HTTPS Proxy URL with fragment", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="https://proxy.example.edu/login?url=https://example.com/#fragment">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fexample.com%2F%23fragment' );
    });

    QUnit.test( "HTTPS Proxy QURL", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="https://proxy.example.edu/login?qurl=https://example.com/">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fexample.com%2F' );
    });

    QUnit.test( "HTTPS Proxy QURL with fragment", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="https://proxy.example.edu/login?qurl=https://example.com/#fragment">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fexample.com%2F%23fragment' );
    });

    QUnit.test( "HTTPS Proxy QURL with encoded fragment", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="https://proxy.example.edu/login?qurl=https://example.com/%23fragment">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fexample.com%2F%23fragment' );
    });

    QUnit.test( "HTTPS Encoded Proxy QURL", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="https://proxy.example.edu/login?qurl=https%3A%2F%2Fexample.com%2F">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fexample.com%2F' );
    });

    QUnit.test( "HTTPS Encoded Proxy QURL with fragment", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="https://proxy.example.edu/login?qurl=https%3A%2F%2Fexample.com%2F%23fragment">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fexample.com%2F%23fragment' );
    });

    QUnit.test( "HTTPS Form action", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<form action="https://example.com/#fragment"></form>');
        console.log( $( fixture.children('form') ) );
        fixture.children('form').ProxyPrefix( { hostnames: new Array( proxy ), attribute: 'action' } );
        console.log( $( fixture.children('form') ) );
        assert.equal( fixture.children('form').attr('action'), 'https://proxy.example.edu/login?qurl=https%3A%2F%2Fexample.com%2F%23fragment' );
    });

});
// vim: expandtab:ts=4:
