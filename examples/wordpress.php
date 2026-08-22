<?php
/**
 * Plugin Name: Astroway Widget Shortcode
 * Description: Adds [astroway_natal] for embedding the Astroway natal chart calculator.
 * Version: 1.0.0
 * License: MIT
 */

if (!defined('ABSPATH')) exit;

add_shortcode('astroway_natal', function ($atts) {
    $a = shortcode_atts([
        'lang'  => 'en',
        'theme' => 'dark',
    ], $atts, 'astroway_natal');

    $langs  = ['uk', 'en', 'de', 'pl', 'es', 'pt', 'fr', 'it', 'hi', 'ko'];
    $themes = ['dark', 'light', 'auto'];

    $lang  = in_array($a['lang'], $langs, true) ? $a['lang'] : 'en';
    $theme = in_array($a['theme'], $themes, true) ? $a['theme'] : 'dark';

    // Скрипт нужен один на страницу, сколько бы шорткодов на ней ни стояло.
    wp_enqueue_script(
        'astroway-widget',
        'https://app.astroway.info/widget.js',
        [],
        null,
        ['strategy' => 'async', 'in_footer' => true]
    );

    return sprintf(
        '<div data-astroway-widget="natal" data-lang="%s" data-theme="%s"></div>',
        esc_attr($lang),
        esc_attr($theme)
    );
});
