<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */


 get_header(); ?>
<div class="single-post-container">

    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

    <div class="post-content">

        <div class="first-section">

            <div class="title_ref">

                <div class="title">
                   
                    <h1 class="post-title line-break-title"><?php the_title(); ?></h1>
                </div>

                <div class="ref">
                    <div class="post-reference">
                        <?php
                       
                        $reference = get_field('references');
                        if ($reference) {
                            echo 'Référence : ' . $reference;
                        }
                        ?>
                    </div>

                    <div class="photo-category">
                        <?php
                        
                        $terms = get_the_terms(get_the_ID(), 'categorie');
                        if ($terms && !is_wp_error($terms)) {
                            echo 'Catégorie : ';
                            foreach ($terms as $term) {
                                echo $term->name . ' ';
                            }
                        }
                        ?>
                    </div>

                    <div class="post-format">
                        <?php
                        
                        $terms = get_the_terms(get_the_ID(), 'format');
                        if ($terms && !is_wp_error($terms)) {
                            echo 'Format : ';
                            foreach ($terms as $term) {
                                echo $term->name . ' ';
                            }
                        }
                        ?>
                    </div>

                    <div class="post-type">
                        <?php
                        
                        $type = get_field('type_de_photo');
                        if ($type) {
                            echo 'Type : ' . $type;
                        }
                        ?>
                    </div>

                    <div class="post-year">
                        <?php
                       
                        $annees = get_field('annees');
						if ($annees){
							echo 'Année : ' . $annees ;
						}
                        ?>
                    </div>

                </div>
            </div>
            
            
            <?php if (has_post_thumbnail()) : ?>
                <div class="post-thumbnail">
                    <?php the_post_thumbnail(); ?>
                </div>
            <?php endif; ?>
            
        </div>

       
        <div class="post-text">
            <?php the_content(); ?>
        </div>
		<div class="second-section">

<div class="CTA">
	
	<p>Cette photo vous intéresse ?</p>
	
	<a class="contact-button" href="#">Contact</a>
</div>

<!-- partie photo mignature -->
<div class="photo-navigation">
	<?php
	
	$prev_post = get_previous_post();
	$next_post = get_next_post();
	?>

	<?php if (!empty($prev_post)) : ?>
		
		<a href="<?php echo esc_url(get_permalink($prev_post->ID)); ?>" class="arrow-thumbnail custom-prev-link">
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/arrow-left.png" class="arrow" data-direction="previous" alt="Previous">
			<?php echo get_the_post_thumbnail($prev_post->ID, 'thumbnail', array('class' => 'mini-thumbnail')); ?>
		</a>
	<?php endif; ?>

	<?php if (!empty($next_post)) : ?>
		
		<a href="<?php echo esc_url(get_permalink($next_post->ID)); ?>" class="arrow-thumbnail custom-next-link">
			<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/arrow-right.png" class="arrow" data-direction="next" alt="Next">
			<?php echo get_the_post_thumbnail($next_post->ID, 'thumbnail', array('class' => 'mini-thumbnail')); ?>
		</a>
	<?php endif; ?>
</div>
</div>    

<!-- Troisième section avec les photos apparentées -->
<div class="third-section double-photos">

<div class="titre">
	<p>VOUS AIMEREZ AUSSI</p>
</div>

<div class="thumbnail-container thumbnail-single">

	<?php
	
	$terms = get_the_terms(get_the_ID(), 'categorie');

	
	if ($terms && !is_wp_error($terms) && is_array($terms) && !empty($terms)) {
		
		$first_category = $terms[0]->slug;
	} else {
		
		$first_category = 'categorie-par-defaut';
	}

	
	$args = array(
		'post_type' => 'photo',
		'post__not_in' => array(get_the_ID()), 
		'posts_per_page' => 2, 
		'tax_query' => array(
			array(
				'taxonomy' => 'categorie',
				'field'    => 'slug',
				'terms'    => $first_category,
			),
		),
	);

	
	$query = new WP_Query($args);
   
    global $query_lightbox;
    $query_lightbox = $query;
	
	?>

	<?php
	
	while ($query->have_posts()) : $query->the_post(); ?>
		<div class="thumbnail">
			<?php
			
			get_template_part('templates_parts/photo_block');
			?>
		</div>
	<?php endwhile; ?>
</div>



<?php

endwhile;
else:
?>

<?php endif; ?>


</div>

<?php get_footer(); ?>