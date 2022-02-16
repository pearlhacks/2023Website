$(document).ready(function () {
    $.getJSON("./assets/json/ws.json", function (data) {
        data = data.GoogleSheetData;
        let div = `<div class="d-flex align-items-center ws-inner my-3 py-3">`;

        let innerDiv=`<div class="section-events col-lg-10 col-xs-12 accordion-container">`
        let w1 = `<div class="section-label col-xs-12 col-lg-2">1:30-2:30</div>` + innerDiv
        let w2 = `<div class="section-label col-xs-12 col-lg-2">2:45-3:45</div>` + innerDiv
        let w3 = `<div class="section-label col-xs-12 col-lg-2">4:00-5:00</div>` + innerDiv
        let w4 = `<div class="section-label col-xs-12 col-lg-2">5:15-6:15</div>` + innerDiv
        let w5 = `<div class="section-label col-xs-12 col-lg-2">7:30-8:30</div>` + innerDiv
        let close = `</div></div>`
        for(let i = 1; i < data.length; i++){
            let idx=0;
         //        ["Title", "Lead", "Time ", "Room", "Description"],
            let content = `<div class="d-flex row">
                        <div class="col-lg-8">
                        <h3 class="acc-title">${data[i][idx]}</h3>
                        <p class="acc-content" style="display: none">
                        ${data[i][idx+4]}
                        </p>
                        </div>
                        <div class="col-lg-2">
                        <span>Host: </span>${data[i][idx+1]}
                        </div>
                        <div class="col-lg-2">
                        <span>Location: </span>${data[i][idx+3]}
                        </div>
                    </div>`
                        
            if(data[i][idx+2] == '1:30-2:30'){
                w1+= content
            } else if(data[i][idx+2] == '2:45-3:45'){
                w2+=content
            } else if(data[i][idx+2] == "4:00-5:00"){
                w3+=content
            } else if(data[i][idx+2] == '5:15-6:15'){
                w4+=content
            } else if(data[i][idx+2] == '7:30-8:30'){
                w5+=content
            }
    
        }
        document.getElementById("ws").innerHTML += ( div + w1+ close + 
            div +w2+ close+  
            div +w3+ close+  
            div +w4+ close+  
            div +w5+ close);

// Use a 250ms delay to trigger your function
setTimeout(function () {
    $(function () {
      var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        var links = this.el.find(".acc-title");
        links.on(
          "click",
          {
            el: this.el,
            multiple: this.multiple,
          },
          this.dropdown
        );
      };

      Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        ($this = $(this)), ($next = $this.next());

        $next.slideToggle();
        $this.parent().toggleClass("open");

        if (!e.data.multiple) {
          $el
            .find(".acc-content")
            .not($next)
            .slideUp()
            .parent()
            .removeClass("open");
        }
      };
      var accordion = new Accordion($(".accordion-container"), false);
    }, 250);
  });

    });
});