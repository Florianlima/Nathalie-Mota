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
        'paged' => 1,
        'order' => 'DESC',
    );


    $query = new WP_Query($args);
    ?>

    <?php if ($query->have_posts()) : ?>
        <div class="filters-photos">
            <div class="filters">
                <div class="tt-select sel" id="photo-category-wrapper">
                    <div class="label">Catégories<i class="fas fa-chevron-down"></i></div>
                    <div class="options" hidden>
                        <div class="option" data-value="" onclick="selectOption('photo-category-wrapper', '')"></div>
                        <?php
                        $photo_categories = get_terms(array(
                            'taxonomy' => 'categorie',
                            'hide_empty' => true,
                        ));
                        if (!empty($photo_categories) && !is_wp_error($photo_categories)) :
                            foreach ($photo_categories as $category) :
                                if ($category->slug !== 'categories') : ?>
                                    <div class="option" data-value="<?php echo esc_attr($category->slug); ?>" onclick="selectOption('photo-category-wrapper', '<?php echo esc_attr($category->slug); ?>')">
                                        <?php echo esc_html($category->name); ?>
                                    </div>
                        <?php endif;
                            endforeach;
                        endif;
                        ?>
                    </div>
                </div>

                <div class="tt-select sel" id="format-wrapper">
                    <div class="label">Formats<i class="fas fa-chevron-down"></i></div>
                    <div class="options" hidden>
                        <div class="option" data-value="" onclick="selectOption('format-wrapper', '')"></div>
                        <?php
                        $formats = get_terms(array(
                            'taxonomy' => 'format',
                            'hide_empty' => true,
                        ));
                        if (!empty($formats) && !is_wp_error($formats)) :
                            foreach ($formats as $format) :
                                if ($format->slug !== 'formats') : ?>
                                    <div class="option" data-value="<?php echo esc_attr($format->slug); ?>" onclick="selectOption('format-wrapper', '<?php echo esc_attr($format->slug); ?>')">
                                        <?php echo esc_html($format->name); ?>
                                    </div>
                        <?php endif;
                            endforeach;
                        endif;
                        ?>
                    </div>
                </div>
            </div>

            <div class="sort">
                <div class="tt-select sel" id="sort-by-wrapper">
                    <div class="label">Trier par<i class="fas fa-chevron-down"></i></div>
                    <div class="options" hidden>
                        <div class="option" data-value="DESC" onclick="selectOption('sort-by-wrapper', 'DESC')">Plus récent</div>
                        <div class="option" data-value="ASC" onclick="selectOption('sort-by-wrapper', 'ASC')">Plus ancien</div>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <input type="hidden" id="photo-category" value="">
        <input type="hidden" id="format" value="">
        <input type="hidden" id="sort-by" value="">

    <?php endif; ?>




    <div class="main-page">

        <div class="thumbnail-container" id="photos-list">
            <?php while ($query->have_posts()) :
                $query->the_post();
                get_template_part('templates_parts/photo_block'); ?>
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
            data-ajaxurl="<?php echo admin_url('admin-ajax.php'); ?>">
            Charger plus
        </button>

    </div>



</main>
<?php get_footer(); ?>