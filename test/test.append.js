$(function(){
    var proxy = "proxy.example.edu";

    QUnit.module( "Append Tests" );

    QUnit.test( "Plugin loaded", function( assert ) {
        assert.ok(jQuery().ProxyPrefix());
    });

    QUnit.test( "No parameters added", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://example.com?q=example">Example</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fexample.com%2F%3Fq%3Dexample' );
    });

    QUnit.test( "EBSCO Permalink URL", function( assert ) {
        var fixture = $( "#qunit-fixture" );

        fixture.append('<a href="http://search.ebscohost.com/login.aspx?direct=true&db=lxh&AN=87608068&site=ehost-live">EBSCO Permalink URL</a>');
        fixture.children('a').ProxyPrefix( { hostnames: new Array( proxy ) } );
        assert.equal( fixture.children('a').attr('href'), 'http://proxy.example.edu/login?qurl=http%3A%2F%2Fsearch.ebscohost.com%2Flogin.aspx%3Fdirect%3Dtrue%26db%3Dlxh%26AN%3D87608068%26site%3Dehost-live%26auth%3Duid%26user%3Dlibraryresearch%26password%3Dlibraryresearch' );
    });

});
// vim: expandtab:ts=4:
