document.addEventListener("DOMContentLoaded", function() {
    var footerContent = '<footer>'+
                            '<address>'+
                                '<p>Author: Brian Andrade</p>'+
                                '<p><a href="mailto:baandraded@correo.usbcali.edu.co">correo</a></p>'+
                                '<a href="https://aws.amazon.com/es/what-is/virtualization/" target="_blank">Webgrafia</a>'+
                            '</address>'+
                        '</footer>';
    document.body.insertAdjacentHTML('beforeend', footerContent);
});
