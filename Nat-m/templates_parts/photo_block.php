<div class="thumbnail" data-id="<?php echo get_the_ID(); ?>">
    <?php the_post_thumbnail('full'); ?>
    <div class="thumbnail-hover">
       
        <div class="thumbnail-hover__overlay">
          
            <div class="thumbnail-hover__eye">
                <a href="<?php echo esc_url(get_permalink()); ?>" class="thumbnail-hover__link">
                    <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/Icon_eye.png" alt="icon-eye">
                       
                </a>
            </div>
          
            <div class="thumbnail-hover__expand">
                <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/Icon_fullscreen.png" alt="agrandir">
                    
            </div>
        </div>
      
        <div class="thumbnail-hover__info">
          
            <div class="thumbnail-hover__ref">
                <span>
                    <?php echo get_post_meta(get_the_ID(), 'references', true); ?>
                </span>
            </div>
         
            <div class="thumbnail-hover__category disable-link">
                <span>
                    <?php echo get_the_term_list(get_the_ID(), 'categorie', '', ', '); ?>
                </span>
            </div>
          
            
        </div>
    </div>
</div>