const GS_ID = "1YiZKc8vb9nlNCSlopOXOKmCli1o1HUSvk_Gt4gZds9Y";

// load colors
fetchSheet
  .fetch({
    gSheetId: GS_ID,
    wSheetName: "colors",
  })
  .then((rows) => {
    rows.forEach(row => document.documentElement.style.setProperty("--color-" + row.id, row.color));

    // also update svg colors
    document.querySelector("#decorator-bg > stop:nth-child(1)").setAttribute("stop-color", rows.find(row => row.id == "gradient-1").color);
    document.querySelector("#decorator-bg > stop:nth-child(2)").setAttribute("stop-color", rows.find(row => row.id == "gradient-2").color);
    document.querySelector("#decorator-bg-2 > stop:nth-child(1)").setAttribute("stop-color", rows.find(row => row.id == "dots").color);
    document.querySelector("#decorator-bg-2 > stop:nth-child(2)").setAttribute("stop-color", rows.find(row => row.id == "dots").color);
  });

// load content
fetchSheet
  .fetch({
    gSheetId: GS_ID,
    wSheetName: "sum",
  })
  .then((rows) => {
    let content = {};
    rows.forEach(row => {
      let key = row.section;
      Object(content).hasOwnProperty(key) || Object.assign(content, { [key]: [] });
      content[key].push(row);
    });

    // document title
    document.title = content.document[0].title;

    // logo
    let logos = content.logo[0];
    $(".header_navbar img").attr("src", logos.logo1);
    $(window).on("scroll", function (event) {
      var scroll = $(window).scrollTop();
      if (scroll < 20) {
        $(".header_navbar").removeClass("sticky");
        $(".header_navbar img").attr("src", logos.logo1);
      } else {
        $(".header_navbar").addClass("sticky");
        $(".header_navbar img").attr("src", logos.logo2);
      }
    });

    // nav items
    let navHtml = "";
    let nav2Html = ""
    content.nav.forEach(row => {
      navHtml += `
        <li class="nav-item">
          <a class="page-scroll" href="${row.navLink}" target="${row.navTarget}">${row.navName}</a>
        </li>
      `;

      nav2Html += `
        <li>
          <a
            class="main-btn main-btn-2 wow fadeInUp page-scroll"
            data-wow-duration="1.3s"
            data-wow-delay="1.4s"
            href="${row.navLink}"
            target="${row.navTarget}"
            >${row.navName}</a
          >
        </li>
      `;

      // update section title
      if (row.navDescription) {
        try { document.querySelector(`${row.navLink} h4`).innerHTML = row.navDescription; } catch (error) { }
      }
    });
    navHtml += `<button class="dks">Đăng ký</button>`
    document.querySelector("#nav").innerHTML = navHtml;
    document.querySelector("#nav-2").innerHTML = nav2Html;
    document.querySelector('.dks').onclick = ()=>{
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSfLYsc03MWMN94UbCUYwBOIT2Q1AnnvHg0h9DphmWu6y0eUhg/viewform?usp=sf_link', '_blank');
    }
    $(function () {
      $('a.page-scroll[href*="#"]:not([href="#"])').on("click", function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

          if (target.length) {
            $("html, body").animate({ scrollTop: target.offset().top - 50, }, 1200, "easeInOutExpo");
            return false;
          }
        }
      });
    });

    // header
    let header = content.header[0];
    document.querySelector("#header-title").outerHTML = header.title;
    document.querySelector("#home > div.container > div > div > div > div").innerHTML = header.description.replaceAll(/^(.+)$/gm, "<p>$1</p>");
    let headerImageUrl = header.resourceUrl || "assets/images/header_app.png";
    document.querySelector("#header-app").innerHTML = `
      <div class="image wow fadeInRightBig" data-wow-duration="1.3s" data-wow-delay="1.8s">
        <img src="${headerImageUrl}" alt="header App" />
        <img src="assets/images/dots.svg" alt="dots" class="dots" />
        <div class="dots">
<svg xmlns="http://www.w3.org/2000/svg" width="255" height="205" viewBox="0 0 255 205">
  <g id="Group_32" data-name="Group 32" transform="translate(-1634 -1383)">
    <circle id="Ellipse_59" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1634 1383)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-2" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1659 1383)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-3" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1684 1383)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-4" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1709 1383)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-5" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1734 1383)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-6" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1759 1383)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-7" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1784 1383)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-8" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1809 1383)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-9" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1834 1383)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-10" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1859 1383)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-11" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1884 1383)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-12" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1634 1408)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-13" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1659 1408)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-14" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1684 1408)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-15" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1709 1408)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-16" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1734 1408)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-17" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1759 1408)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-18" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1784 1408)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-19" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1809 1408)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-20" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1834 1408)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-21" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1859 1408)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-22" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1884 1408)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-23" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1634 1433)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-24" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1659 1433)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-25" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1684 1433)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-26" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1709 1433)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-27" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1734 1433)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-28" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1759 1433)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-29" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1784 1433)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-30" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1809 1433)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-31" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1834 1433)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-32" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1859 1433)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-33" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1884 1433)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-34" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1634 1458)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-35" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1659 1458)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-36" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1684 1458)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-37" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1709 1458)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-38" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1734 1458)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-39" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1759 1458)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-40" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1784 1458)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-41" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1809 1458)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-42" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1834 1458)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-43" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1859 1458)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-44" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1884 1458)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-45" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1634 1483)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-46" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1659 1483)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-47" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1684 1483)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-48" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1709 1483)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-49" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1734 1483)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-50" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1759 1483)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-51" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1784 1483)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-52" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1809 1483)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-53" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1834 1483)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-54" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1859 1483)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-55" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1884 1483)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-56" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1634 1508)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-57" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1659 1508)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-58" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1684 1508)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-59" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1709 1508)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-60" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1734 1508)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-61" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1759 1508)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-62" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1784 1508)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-63" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1809 1508)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-64" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1834 1508)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-65" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1859 1508)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-66" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1884 1508)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-67" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1634 1533)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-68" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1659 1533)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-69" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1684 1533)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-70" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1709 1533)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-71" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1734 1533)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-72" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1759 1533)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-73" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1784 1533)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-74" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1809 1533)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-75" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1834 1533)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-76" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1859 1533)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-77" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1884 1533)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-78" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1634 1558)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-79" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1659 1558)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-80" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1684 1558)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-81" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1709 1558)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-82" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1734 1558)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-83" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1759 1558)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-84" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1784 1558)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-85" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1809 1558)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-86" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1834 1558)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-87" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1859 1558)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-88" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1884 1558)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-89" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1634 1583)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-90" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1659 1583)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-91" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1684 1583)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-92" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1709 1583)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-93" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1734 1583)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-94" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1759 1583)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-95" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1784 1583)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-96" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1809 1583)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-97" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1834 1583)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-98" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1859 1583)" fill="url(#decorator-bg-2)"/>
    <circle id="Ellipse_59-99" data-name="Ellipse 59" cx="2.5" cy="2.5" r="2.5" transform="translate(1884 1583)" fill="url(#decorator-bg-2)"/>
  </g>
</svg>
        </div>
      </div>
    `;

    // about
    let about = content.about[0];
    document.querySelector("#about > div > div > div:nth-child(2) > div > div > h4").innerHTML = about.title;
    document.querySelector("#about-description").innerHTML = about.description.replaceAll(/^(.+)$/gm, "<p>$1</p>");
    document.querySelector("#about > div > div > div.col-lg-6.col-md-9 > div > img.image").src = about.resourceUrl;

    // timeline
    let timelineHtml = "";
    content.timeline.forEach((row) => {
      timelineHtml += `
      <div class="py-3 col-lg-4 col-md-8 col-sm-10">
        <div
          class="h-100 single_pricing text-center pricing_color_1 wow fadeInUp"
          data-wow-duration="1.3s"
          data-wow-delay="0.2s"
          style="border-top: 3px solid var(--color-1)">
          <div class="pricing_top_bar">
            <h4 class="title" style="color: var(--color-1)">${row.eventLeading}</h4>
            <span class="price" style="color: var(--color-1)">${row.eventDate}</span>
          </div>
          <div class="pricing_list px-4 text-left">
            <ul>
    `;

      row.eventDetail.split("\n").forEach((detail) => {
        try {
          let target = /(\d{1,2}\s?(:|giờ|h|g)\s?\d{0,2}( - | đến )?\d{0,2}\s?(:|gio|h|g)?\s?\d{0,2}): (.*)/g.exec(detail);
          let time = target[1];
          let evnt = target[5];

          timelineHtml += `<li><strong style="color: var(--color-1)">${time}:&nbsp;</strong>${evnt}</li>`;
        } catch (error) {
          timelineHtml += `<li>${detail}</li>`;
        }
      });

      timelineHtml += `</ul></div></div></div>`;
    });

    document.querySelector("#timeline").innerHTML = timelineHtml;

    // video
    let videoHtml = "";
    content.video.forEach(row => {
      videoHtml += `
        <div class="video-item-container" title="${row.title}">
          <iframe
            src="${modifyVideoUrl(row.resourceUrl)}"
            title="${row.title}"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      `;
    });
    document.querySelector("#video div:nth-child(2)").innerHTML = videoHtml;

    $("#video div:nth-child(2)").slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: false,
      prevArrow: '<span class="prev"><i class="lni lni-arrow-left"></i></span>',
      nextArrow: '<span class="next"><i class="lni lni-arrow-right"></i></span>',
    });

    // gallery
    let galleryHtml = "";

    content.gallery.forEach((row, i) => {
      galleryHtml += `
        <div class="single_slider">
          <img src="${row.resourceUrl}" alt="Screen Shot ${i}" />
        </div>
      `;
    });

    document.querySelector("#gallery").innerHTML = galleryHtml;

    $(".screenshot_active").slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      pauseOnHover: false,
      prevArrow: '<span class="prev"><i class="lni lni-arrow-left"></i></span>',
      nextArrow: '<span class="next"><i class="lni lni-arrow-right"></i></span>',
      responsive: [{ breakpoint: 1200, settings: { slidesToShow: 2, }, }, { breakpoint: 992, settings: { slidesToShow: 3, }, }, { breakpoint: 768, settings: { slidesToShow: 2, }, }, { breakpoint: 576, settings: { slidesToShow: 1, }, },],
    });

    // map
    document.querySelector("#download iframe").src = content.map[0].resourceUrl;
    document.querySelector("#video iframe").src = content.video[0].resourceUrl;

    // testimonial
    let testimonialHtml = "";

    content.testimonial.forEach((row) => (testimonialHtml += `<img class="participant-logo" src="${row.resourceUrl}" alt="${row.resourceUrl}">`));
    document.querySelector("#participant").innerHTML = testimonialHtml;

    $("#participant").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: false,
      nextArrow: false,
      responsive: [{ breakpoint: 992, settings: { slidesToShow: 3, }, }, { breakpoint: 768, settings: { slidesToShow: 2, }, }, { breakpoint: 576, settings: { slidesToShow: 1, }, }],
    });

    // news
    let postHtmls = "";

    content.news.forEach((row) => {
      postHtmls += `
      <div class="col-lg-4 col-md-8">
        <div class="single_blog blog_1 mt-30 wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s">
          <div class="blog_image">
            <img src="${row.postImageUrl}" alt="blog" />
          </div>
          <div class="blog_content">
            <div class="blog_meta d-flex justify-content-between">
              <div class="meta_date">
                <span>${row.postCreatedAt}</span>
              </div>
              <div class="meta_like"></div>
            </div>
            <h4 class="blog_title">
              <a target="_blank" href="${row.postLink}">${row.postTitle}</a>
            </h4>
            <p>${row.postDescription}</p>
            <a target="_blank" href="${row.postLink}" class="main-btn">Xem Thêm</a>
          </div>
        </div>
      </div>
    `;
    });

    document.querySelector("#blog-items").innerHTML = postHtmls;

    $("#blog-items").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      speed: 300,
      infinite: true,
      autoplaySpeed: 2000,
      prevArrow: '<span class="prev"><i class="lni lni-arrow-left"></i></span>',
      nextArrow: '<span class="next"><i class="lni lni-arrow-right"></i></span>',
      autoplay: true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
    let postHtml = ''
    content.blogs.forEach((row) => {
      postHtml += `
      <div class="col-lg-4 col-md-8">
        <div class="single_blog blog_1 mt-30 wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s">
          <div class="blog_image">
            <img src="${row.postImageUrl}" alt="blog" />
          </div>
          <div class="blog_content">
            <div class="blog_meta d-flex justify-content-between">
              <div class="meta_date">
                <span>${row.postCreatedAt}</span>
              </div>
              <div class="meta_like"></div>
            </div>
            <h4 class="blog_title">
              <a target="_blank" href="${row.postLink}">${row.postTitle}</a>
            </h4>
            <p>${row.postDescription}</p>
            <a target="_blank" href="${row.postLink}" class="main-btn">Xem Thêm</a>
          </div>
        </div>
      </div>
    `;
    });

    document.querySelector("#new-items").innerHTML = postHtml;

    $("#new-items").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      speed: 300,
      infinite: true,
      autoplaySpeed: 2000,
      prevArrow: '<span class="prev"><i class="lni lni-arrow-left"></i></span>',
      nextArrow: '<span class="next"><i class="lni lni-arrow-right"></i></span>',
      autoplay: true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
    // footer
    document.querySelector("#footer").outerHTML = content.footer[0].html.replaceAll(/""/g, "\"");
  });
