<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>

    <header class="site-header">
        <div class="container">
            <div class="site-logo">
                <a href="<?php echo esc_url(home_url('/')); ?>">
                    <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/logo.png" alt="Logo">
                </a>
            </div>

            <nav class="site-navigation">
                <div class="burgerBtn">
                    <span></span>
                </div>
                <div class="fullscreenMenu">
                    <ul>
                        <li id="menu-item-74" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-74">
                            <a href="/" aria-current="page">accueil</a>
                        </li>
                        <li id="menu-item-19" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-19">
                            <a href="http://nathalie-mota.local/a-propos/">à propos</a>
                        </li>
                        <li id="menu-item-18" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-18">
                            <a href="http://nathalie-mota.local/contact/" class="modal-trigger">contact</a>
                        </li>
                    </ul>
                </div>
                <ul class="main-menu">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_class' => 'main-menu',
                    ));
                    ?>
                </ul>
            </nav>
        </div>
    </header>

    <?php wp_footer(); ?>
</body>
</html>
