// Display selected Image
var loadFile = function (event) {
  $('#dominant-title').text('');
  $('#palettes-title').text('');
  $('#result-dominant').html('');
  $('#result-palettes').html('');

  if ($('input[name=image]').val() == "") {
    $('#image-preview').html('');
  }
  else {
    var src = URL.createObjectURL(event.target.files[0]);
    $('#image-preview').html('<div class="fw-bold">Selected Image</div><img src="' + src + '" class="shadow" style="display:block;max-width:100%;border-radius:16px;" />');
  }
};

// FORM SUBMIT
$('form#img-form').on('submit', function (evt) {
  evt.preventDefault();
  var action = this.getAttribute('action');
  var method = this.getAttribute('method');
  var form_data = new FormData(this);
  $('#dominant-title').text('');
  $('#palettes-title').text('');
  $('#result-dominant').html('');
  $('#result-palettes').html('');
  $.ajax({
    url: action,
    method: method,
    data: form_data,
    dataType: 'JSON',
    contentType: false,
    processData: false,
    success: function (res) {
      console.dir(res);
      if (res.error == 1) {
        alert(res.message)
      }
      if (res.error == 0) {
        var dominantHtml = '';
        var background = '';
        res.color_format == 'hex' ?
          dominantBackground = res.dominant_color :
          dominantBackground = 'rgba( ' + res.dominant_color + ' )';
        dominantHtml +=
          '<div class="item py-4 shadow" style="background-color: ' + dominantBackground + ' ;"></div>' +
          '<div class="mb-2 text-end fw-bold">' + res.dominant_color + '</div>'
          ;
        $('#result-dominant').html(dominantHtml);

        var html = '';
        var background = '';
        for (let i = 0; i < res.palette_colors.length; i++) {
          res.color_format == 'hex' ?
            background = res.palette_colors[i] :
            background = 'rgba( ' + res.palette_colors[i] + ' )';
          html +=
            '<div class="item-box">' +
            '<div class="item" style="background-color:' + background + ';">' +
            '<span class="bg-light p-1">' + res.palette_colors[i] + '</span>' +
            '</div>' +
            '</div>'
            ;
        }
        $('#result-palettes').html(html);

        $('#dominant-title').text('Dominant Color');
        $('#palettes-title').text('Color Palettes');

      }
    },
    error: function (xhr, status, error) {
      console.dir('xhr: ' + xhr);
      console.dir('status: ' + status);
      console.dir('error: ' + error);
    }
  });
});