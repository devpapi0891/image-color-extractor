<?php
require_once('components/top.php');
?>

<div class="container py-5">
    <center>
        <h1 class="text-dark mb-5">Color Extractor</h1>
    </center>
    <div class="row">
        <div class="col-lg-4 mb-3">
            <form action="server/controller/color-extract.inc.php" method="post" enctype="multipart/form-data"
            class="border p-3 mb-5 shadow" id="img-form">
                <div class="mb-3">
                    <label for="">Upload Image</label>
                    <input type="file" name="image" class="form-control" accept="image/*" onchange="loadFile(event)">
                    <div class="py-1 text-end">
                        <small class="text-secondary">jpg, jpeg, png</small>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="">Palette Count</label>
                    <select name="palette_count" id="" class="form-control">
                        <option value="5">5 - <span class="text-danger">recommended</span></option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="">Color Format</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value="rgb" name="color_format" id="rgbFormat" checked>
                        <label class="form-check-label" for="rgbFormat">
                            RGB
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" value="hex" name="color_format" id="hexFormat">
                        <label class="form-check-label" for="hexFormat">
                            HEX
                        </label>
                    </div>
                </div>
                <div class="mb-3 text-end">
                    <button type="submit" class="btn btn-dark">Extract Colors</button>
                </div>
            </form>

            <div class="mb-4" id="image-preview"></div>
        </div>
        <div class="col-lg-8 mb-3 py-5">
            
            <div class="h4" id="dominant-title"></div>
            <div class="mb-5" id="result-dominant"></div>
                
            <div class="h4" id="palettes-title"></div>
            <div class="mb-5" id="result-palettes"></div>
            
        </div>
    </div>
</div>

<?php
require_once('components/bottom.php');
?>

<script>
    // Display selected Image
    var loadFile = function(event) {
        $('#dominant-title').text('');
        $('#palettes-title').text('');
        $('#result-dominant').html('');
        $('#result-palettes').html('');

        if ( $('input[name=image]').val() == "" ) 
        {
            $('#image-preview').html('');
        } 
        else 
        {
            var src = URL.createObjectURL(event.target.files[0]);
            $('#image-preview').html('<div class="fw-bold">Selected Image</div><img src="'+src+'" class="shadow" style="display:block;max-width:100%;border-radius:16px;" />');
        }
    };
    
    // FORM SUBMIT
    $('form#img-form').on('submit', function(evt) {
        evt.preventDefault();
        var action = this.getAttribute('action');
        var method = this.getAttribute('method');
        var form_data = new FormData(this);
        $('#dominant-title').text('');
        $('#palettes-title').text('');
        $('#result-dominant').html('');
        $('#result-palettes').html('');
        $.ajax({
            url : action,
            method : method,
            data : form_data,
            dataType : 'JSON',
            contentType : false,
            processData : false,
            success : function(res) 
            {
                console.dir(res);
                if (res.error == 1) {
                    alert(res.message)
                }
                if (res.error == 0) 
                {
                    var dominantHtml = '';
                    var background = '';
                    res.color_format == 'hex' ?
                    dominantBackground = res.dominant_color :
                    dominantBackground = 'rgba( '+res.dominant_color+' )';
                    dominantHtml +=
                    '<div class="item py-4 shadow" style="background-color: '+dominantBackground+' ;"></div>'+
                    '<div class="mb-2 text-end fw-bold">'+res.dominant_color+'</div>'
                    ;
                    $('#result-dominant').html(dominantHtml); 

                    var html = '';
                    var background = '';
                    for (let i = 0; i < res.palette_colors.length; i++) {
                        res.color_format == 'hex' ?
                        background = res.palette_colors[i] :
                        background = 'rgba( '+res.palette_colors[i]+' )';
                        html +=
                        '<div class="item-box">'+
                            '<div class="item" style="background-color:'+background+';">'+
                                '<span class="bg-light p-1">'+res.palette_colors[i]+'</span>'+
                            '</div>'+
                        '</div>'
                        ;
                    }
                    $('#result-palettes').html(html);

                    $('#dominant-title').text('Dominant Color');
                    $('#palettes-title').text('Color Palettes');
                    
                }
            },
            error : function(xhr, status, error)
            {
                console.dir('xhr: '+xhr);
                console.dir('status: '+status);
                console.dir('error: '+error);
            }
        });
    });
</script>

<style>
    #result-dominant .item {
        border-radius: 10px;
    }
    #result-palettes {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    #result-palettes .item-box {
        width: 16%;
        min-width: 100px;
        margin: 2% 1%;
    }
    @media only screen and (max-width: 800px) {
        #result-palettes .item-box {
            width: 40%;
        }
        
    }

    #result-palettes .item {
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8%;
        cursor: pointer;
        border: solid 1px rgba(0,0,0,0.1);
    }
    #result-palettes .item-box .item span {
        opacity: 0;
        transition: opacity 0.3s linear;
        /* user-select: none;  */
    }

    #result-palettes .item-box .item:hover span {
        opacity: 1;
    }
</style>