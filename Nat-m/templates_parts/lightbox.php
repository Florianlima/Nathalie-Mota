<?php global $query_lightbox; ?>

<?php if (isset($query_lightbox)): ?>
    <div class="lightbox">
        <button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container">
        <?php while ($query_lightbox->have_posts()): ?>
            <?php $query_lightbox->the_post(); ?>
            <div class="thumbnail-lightbox" data-id="<?php echo get_the_ID(); ?>">
                
                <?php the_post_thumbnail("full"); ?>
            </div>
            
        <?php endwhile; wp_reset_postdata(); ?>
        </div>
    </div>
<?php endif; ?>
