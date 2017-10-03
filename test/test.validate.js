$(function(){
    var proxy = "proxy.example.edu";

    QUnit.module( "Validation Tests" );

    QUnit.test( "Plugin loaded", function( assert ) {
        assert.ok(jQuery().ProxyPrefix());
    });

    QUnit.test( "mailto URN", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="mailto:text@example.com">test@example.com</a>');
        fixture.children('a').ProxyPrefix();
        assert.equal( fixture.children('a').attr('href'), 'mailto:text@example.com');
    });

    QUnit.test( "IPv4 HTTP", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://127.0.0.1/">127.0.0.1</a>');
        fixture.children('a').ProxyPrefix();
        assert.equal( fixture.children('a').attr('href'), 'http://127.0.0.1/');
    });

    QUnit.test( "IPv4 HTTPS", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="https://127.0.0.1/">127.0.0.1</a>');
        fixture.children('a').ProxyPrefix();
        assert.equal( fixture.children('a').attr('href'), 'https://127.0.0.1/');
    });

    QUnit.test( "IPv6 HTTP", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://fe80:0000:0000:0000:0204:61ff:fe9d:f156/">fe80:0000:0000:0000:0204:61ff:fe9d:f156</a>');
        fixture.children('a').ProxyPrefix();
        assert.equal( fixture.children('a').attr('href'), 'http://fe80:0000:0000:0000:0204:61ff:fe9d:f156/');
    });

    QUnit.test( "IPv6 HTTPS", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="https://fe80:0000:0000:0000:0204:61ff:fe9d:f156/">fe80:0000:0000:0000:0204:61ff:fe9d:f156</a>');
        fixture.children('a').ProxyPrefix();
        assert.equal( fixture.children('a').attr('href'), 'https://fe80:0000:0000:0000:0204:61ff:fe9d:f156/');
    });

    // FIXME: URLjs does not appear to support RFC2732 IPv6 literal addresses

    QUnit.test( "Missing protocol", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="proxy.example.edu">proxy.example.edu</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fproxy.example.edu' );
    });

    QUnit.test( "Unsupported protocol test Name (FTP)", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="ftp://proxy.example.edu/">proxy.example.edu</a>');
        fixture.children('a').ProxyPrefix();
        assert.equal( fixture.children('a').attr('href'), 'ftp://proxy.example.edu/');
    });

    QUnit.test( "Unsupported protocol test Name (Gopher)", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="gopher://proxy.example.edu/">proxy.example.edu</a>');
        fixture.children('a').ProxyPrefix();
        assert.equal( fixture.children('a').attr('href'), 'gopher://proxy.example.edu/');
    });

    QUnit.test( "Unsupported protocol test IPv4 (FTP)", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="ftp://127.0.0.1/">127.0.0.1</a>');
        fixture.children('a').ProxyPrefix();
        assert.equal( fixture.children('a').attr('href'), 'ftp://127.0.0.1/');
    });

    QUnit.test( "Unsupported protocol test IPv4 (Gopher)", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="gopher://127.0.0.1/">127.0.0.1</a>');
        fixture.children('a').ProxyPrefix();
        assert.equal( fixture.children('a').attr('href'), 'gopher://127.0.0.1/');
    });

    QUnit.test( "Unsupported protocol test IPv6 (FTP)", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="ftp://[::1]/">[::1]</a>');
        fixture.children('a').ProxyPrefix();
        assert.equal( fixture.children('a').attr('href'), 'ftp://[::1]/');
    });

    QUnit.test( "Unsupported protocol test IPv6 (Gopher)", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="gopher://[::1]/">[::1]</a>');
        fixture.children('a').ProxyPrefix();
        assert.equal( fixture.children('a').attr('href'), 'gopher://[::1]/');
    });
});
// vim: expandtab:ts=4:
