 function shorten(str, maxLength, separator = " ") {
             if (str.length <= maxLength) return str;
             return str.substring(0, str.lastIndexOf(separator, maxLength));
         }

console.log(shorten("Lorem ipsum dolor amet artisan kombucha keytar, craft beer chillwave occupy pok pok enamel pin. Franzen sustainable live-edge offal four dollar toast stumptown, art party pok pok green juice iPhone. VHS shoreditch cardigan gluten-free banh mi. Tofu snackwave lumbersexual pok pok beard banjo post-ironic PBR&B whatever vegan tousled swag biodiesel. Vape irony put a bird on it, authentic kale chips etsy viral. Jean shorts sartorial salvia vinyl copper mug tofu locavore freegan. Tumeric intelligentsia semiotics af, farm-to-table direct trade brooklyn locavore ethical meh godard.", 100))


<% function shorten(str, maxLength, separator = " ") { %>
    <% if (str.length <= maxLength) return str; %>
    <% return str.substring(0, str.lastIndexOf(separator, maxLength)); %>
<% } %>