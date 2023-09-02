<?php
if (!isset($_FILES['image'])) {
    echo json_encode(["error" => 1, "message" => "File upload Empty. Can only accept image file"]);
    exit;
}
$AllowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

if (!in_array($_FILES['image']['type'], $AllowedTypes)) {
    echo json_encode(["error" => 1, "message" => "Invalid file type. Only .jpeg, .jpg, png is accepted"]);
    exit;
}

if ($_FILES['image']['size'] == 0 && $_FILES['image']['error'] !== 0) {
    echo json_encode(["error" => 1, "message" => "File upload Empty"]);
    exit;
}

$allowedFileTypes = [
    "jpg",
    "jpeg",
    "png"
];

$fname_arr = explode('.', $_FILES['image']['name']);
$extension = strtolower(end($fname_arr));
if ( !in_array( $extension, $allowedFileTypes ) ) {
    echo json_encode(["error" => 1, "message" => "File type is invalid"]);
    exit;
}

$source = $_FILES['image']['tmp_name'];
$sourceImage = $source;
$paletteCount = $_POST['palette_count'];
$colorFormat = $_POST['color_format'];

$allowedColorFormat = ['rgb', 'hex'];
if (!in_array( $colorFormat, $allowedColorFormat )) {
    $colorFormat = 'rgb';
}

require_once('../plugins/vendor/autoload.php');
use ColorThief\ColorThief;
$dominantColor = ColorThief::getColor($sourceImage);
$palettes = ColorThief::getPalette($sourceImage, $paletteCount);

$dominant = implode(', ', $dominantColor);

$palette_data = [];
foreach ( $palettes as $palette ) {
    $dt = implode(', ', $palette);
    $palette_data[] = $dt;
}
$palettes_result = $palette_data;


// IF POST COLOR FORMAT is equal to hex
if ( $colorFormat == 'hex' ) 
{
    // FOR DOMINANT
    $hex_color_dominant = sprintf('#%02x%02x%02x', $dominantColor[0], $dominantColor[1], $dominantColor[2]);
    $dominant_hex = $hex_color_dominant;
    $dominant = $dominant_hex;

    // FOR PALETTES
    $palettes_hex_data = [];
    foreach ( $palettes as $id => $rgb ) {
        $hex_color = sprintf('#%02x%02x%02x', $rgb[0], $rgb[1], $rgb[2]);
        $palettes_hex_data[] = $hex_color;
    }
    $palettes_result = $palettes_hex_data;
}

// REMOVE DUPLICATES OF EACH PALETTES AND RETURN ONLY UNIQUE RESULT
$final_palettes = [];
foreach ( $palettes_result as $unique_palette ) 
{
    if ( !in_array( $unique_palette, $final_palettes ) ) {
        $final_palettes[] = $unique_palette;
    }
}


echo json_encode(
    [
        "error" => 0,
        "message" => "success",
        "color_format" => $colorFormat,
        "palette_colors" => $final_palettes,
        "dominant_color" => $dominant
    ]
);
