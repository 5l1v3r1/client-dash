<?php
/*
* All core functions go here
*/

function cd_create_tab_page($options){
  extract($options);

  global $cd_existing_pages;

  // Declare static variable
  $first_tab = '';

  /* Create Tab Menu */

  // Get the page for building url
  $current_page = $_GET['page'];

  // If a tab is open, get it
  if (isset($_GET['tab']))
    $active_tab = $_GET['tab'];

  // Allow tabs to be modified
  $tabs = apply_filters('cd_modify_tabs', $tabs);
  ?>

  <h2 class="nav-tab-wrapper">
    <?php $i=0; foreach ($tabs as $name => $link): $i++;
      // Don't skip by default
      $skip = false;

      // See if this tab belongs
      foreach ($cd_existing_pages as $page => $tabs):
        if (in_array($link, $tabs) && $page != $current_page)
          $skip = true;
      endforeach;

      // Skip if necessary
      if ($skip)
        continue;

      // If first tab and none set, or if active tab is this tab, activate
      if ($i == 1 && !$active_tab || $link == $active_tab)
        $active = 'nav-tab-active';
      else
        $active = '';

      // Save first tab for later
      if ($i == 1)
        $first_tab = $link;

      echo '<a href="?page='.$current_page.'&tab='.$link.'" class="nav-tab '.$active.'">'.$name.'</a>';
    endforeach; ?>
  </h2>
  <?php

  /* Output Tab Content */

  if (!$active_tab)
    $active_tab = $first_tab;

  // Allow plugins to add content before existing content
  do_action('cd_before_'.$active_tab.'_tab');

  // Get content from tab file
  $file_path = plugin_dir_path(__FILE__).'tabs/'.$current_page.'/tab-'.$active_tab.'.php';

  if (file_exists($file_path))
    include_once(plugin_dir_path(__FILE__).'tabs/'.$current_page.'/tab-'.$active_tab.'.php');
  else
    echo '<p class="cd-error">No tab page has been created yet!<br/>Please create a page under "/admin/tabs/{pagename}/tab-{tabname}.php"</p>';

  // Allow plugins to add content after existing content
  do_action('cd_after_'.$active_tab.'_tab');
}

function cd_add_content($tab){

}

function cd_enable_tabs(){
  global $cd_enable_tabs;


}

function cd_settings_header($options){
  extract($options);

  global $cd_fields;

  if (isset($_POST["update_settings"])) {
    foreach ($fields as $field):
      $var = esc_attr($_POST[$field]);
      update_option($field, $var);
    endforeach;
    ?>
    <div id="cd-message" class="cd-updated cd-message-closed">Settings saved!</div>
    <?php
  } 

  foreach ($fields as $field):
    $cd_fields[$field] = get_option($field);
  endforeach;

  echo '<form method="POST" action=""><table class="form-table">';
}

function cd_settings_footer(){
  echo '
  </table>
  <p>
    <input type="submit" value="Save settings" class="button-primary"/>
  </p>
  <input type="hidden" name="update_settings" value="Y" />
  </form>
  ';
}
?>