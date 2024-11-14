<?php get_header (); ?>
<?php get_header(); ?>
<main class="main-body">

<?php

$random_image_args = array(
    'post_type' => 'photo',     
    'posts_per_page' => 1,      
    'orderby' => 'rand',
    'tax_query' => array(
        array(
            'taxonomy' => 'format',
            'field' => 'slug',
            'terms' => 'paysage', 
        ),
    ),
);

$random_image_query = new WP_Query($random_image_args);

if ($random_image_query->have_posts()) {
    while ($random_image_query->have_posts()) {
        $random_image_query->the_post();
        $background_image_url = get_the_post_thumbnail_url(null, 'full');
        
        
        echo '<div style="background-image: url(' . esc_url($background_image_url) . ');"></div>';
    }

    wp_reset_postdata();
}
?>


<!-- Section du héros avec l'image de fond aléatoire -->
<div class="hero" style="background-image: url('<?php echo esc_url($background_image_url); ?>');">
    <h1><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/title.png" alt="title"></h1>
</div>

<?php

$args = array(
    'post_type' => 'photo',
    'posts_per_page' => 8,
    'paged' => 1 ,
    'order' => 'DESC',
);


$query = new WP_Query( $args );
?>

<div class="main-page">
        
        <div class="thumbnail-container" id="photos-list">
            <?php while($query->have_posts()) : ?>
                <?php $query->the_post(); ?>
                <?php get_template_part('templates_parts/photo_block' ); ?>
            <?php endwhile; ?>
            <?php wp_reset_postdata(); ?>
        </div>
    </div>




<div class="load-more-btn">
<button
    id="load-more-btn"
    data-postid="<?php echo get_the_ID(); ?>"
    data-nonce="<?php echo wp_create_nonce('load_more_photos'); ?>"
    data-action="load_more_photos"
    data-ajaxurl="<?php echo admin_url('admin-ajax.php'); ?>"
>
    Charger plus
</button>

</div>



</main>
<?php get_footer (); ?>