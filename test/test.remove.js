$(function(){
    var proxy = "proxy.example.edu"

    test("Plugin loaded", 1, function() {
        ok(jQuery().ProxyPrefix());
    });

    test("All parameters passed", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://example.com?q=example">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%3Fq%3Dexample' );
    });

    test("EBSCO Session ID", 1, function() {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://web.ebscohost.com/ehost/search/basic?sid=bb66fcf7-b1d8-475c-92b7-0008d7036a51%40sessionmgr10&vid=2&hid=28">EBSCO URL</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fweb.ebscohost.com%2Fehost%2Fsearch%2Fbasic%3Fvid%3D2%26hid%3D28' );
    });

});
// vim: expandtab:ts=4:
