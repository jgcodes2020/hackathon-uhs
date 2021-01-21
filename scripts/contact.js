$(() => {
  $("#discord-list li").each((index, elem) => {
    const $elem = $(elem);
    $elem.attr("data-clipboard-text", $elem.text());
    console.log($elem.text());
  }).tooltip({
    trigger: 'click',
    placement: 'top'
  });

  //Setup clipboard.js
  var clipboard = new ClipboardJS("#discord-list li");

  function setTooltip(elem, message) {
    $(elem).tooltip('hide')
      .attr('data-original-title', message)
      .tooltip('show');
  }

  function hideTooltip(elem) {
    setTimeout(function () {
      $(elem).tooltip('hide');
    }, 1000);
  }

  clipboard.on('success', e => {
    setTooltip(e.trigger, 'Copied!');
    hideTooltip(e.trigger);
  });

  clipboard.on('error', e => {
    setTooltip(e.trigger, 'Failed!');
    hideTooltip(e.trigger);
  });

  //make section fill page 
  const root = document.documentElement;
  const $sectLastChild = $("section:last-child")
  const offset = $sectLastChild.offset().top;
  console.log(offset);
  root.style.setProperty("--offset", `${offset}px`);
  console.log(root.style.getPropertyValue("--offset"));

  $(window).on("resize", event => {
    const condition = $(document).height() <= $(window).height();
    const value = condition? 'calc(100vh - var(--offset))' : '';
    $sectLastChild.css({
      "height": value
    });
  }).trigger("resize")
});

