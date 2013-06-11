$(function(){
    test("Plugin loaded", 1, function() {
        ok(jQuery().ProxyPrefix());
    });


    test("mailto URN", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="mailto:text@example.com">test@example.com</a>');
        fixture.children('a').ProxyPrefix();
        equal( fixture.children('a').attr('href'), 'mailto:text@example.com');
    });

    test("IPv4 HTTP", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://127.0.0.1/">127.0.0.1</a>');
        fixture.children('a').ProxyPrefix();
        equal( fixture.children('a').attr('href'), 'http://127.0.0.1/');
    });

    test("IPv4 HTTPS", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="https://127.0.0.1/">127.0.0.1</a>');
        fixture.children('a').ProxyPrefix();
        equal( fixture.children('a').attr('href'), 'https://127.0.0.1/');
    });

    test("IPv6 HTTP", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://fe80:0000:0000:0000:0204:61ff:fe9d:f156/">fe80:0000:0000:0000:0204:61ff:fe9d:f156</a>');
        fixture.children('a').ProxyPrefix();
        equal( fixture.children('a').attr('href'), 'http://fe80:0000:0000:0000:0204:61ff:fe9d:f156/');
    });

    test("IPv6 HTTPS", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="https://fe80:0000:0000:0000:0204:61ff:fe9d:f156/">fe80:0000:0000:0000:0204:61ff:fe9d:f156</a>');
        fixture.children('a').ProxyPrefix();
        equal( fixture.children('a').attr('href'), 'https://fe80:0000:0000:0000:0204:61ff:fe9d:f156/');
    });

    // FIXME: URLjs does not appear to support RFC2732 IPv6 literal addresses

    test("Missing protocol", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="proxy.example.edu">proxy.example.edu</a>');
        fixture.children('a').ProxyPrefix();
        equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fproxy.example.edu' );
    });

    test("Unsupported protocol test Name (FTP)", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="ftp://proxy.example.edu/">proxy.example.edu</a>');
        fixture.children('a').ProxyPrefix();
        equal( fixture.children('a').attr('href'), 'ftp://proxy.example.edu/');
    });

    test("Unsupported protocol test Name (Gopher)", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="gopher://proxy.example.edu/">proxy.example.edu</a>');
        fixture.children('a').ProxyPrefix();
        equal( fixture.children('a').attr('href'), 'gopher://proxy.example.edu/');
    });

    test("Unsupported protocol test IPv4 (FTP)", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="ftp://127.0.0.1/">127.0.0.1</a>');
        fixture.children('a').ProxyPrefix();
        equal( fixture.children('a').attr('href'), 'ftp://127.0.0.1/');
    });

    test("Unsupported protocol test IPv4 (Gopher)", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="gopher://127.0.0.1/">127.0.0.1</a>');
        fixture.children('a').ProxyPrefix();
        equal( fixture.children('a').attr('href'), 'gopher://127.0.0.1/');
    });

    test("Unsupported protocol test IPv6 (FTP)", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="ftp://[::1]/">[::1]</a>');
        fixture.children('a').ProxyPrefix();
        equal( fixture.children('a').attr('href'), 'ftp://[::1]/');
    });

    test("Unsupported protocol test IPv6 (Gopher)", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="gopher://[::1]/">[::1]</a>');
        fixture.children('a').ProxyPrefix();
        equal( fixture.children('a').attr('href'), 'gopher://[::1]/');
    });
});
// vim: expandtab:ts=4:
