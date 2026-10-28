<?php
# Light / dark theme switch in the navbar. The choice is kept per browser.

class DarkThemePlugin extends MantisPlugin {
	public function register() {
		$this->name = plugin_lang_get( 'title' );
		$this->description = plugin_lang_get( 'description' );
		$this->version = '1.0.0';
		$this->requires = array( 'MantisCore' => '2.28.0' );
		$this->author = 'Regis Camimura';
		$this->contact = 'regiscamimura@gmail.com';
		$this->url = 'https://github.com/regiscamimura/MantisBT-DarkTheme';
	}

	public function hooks() {
		return array( 'EVENT_LAYOUT_RESOURCES' => 'print_resources' );
	}

	public function print_resources() {
		echo '<link rel="stylesheet" type="text/css" href="' . $this->versioned_file( 'dark_theme.css' ) . '" />', "\n";
		# Not deferred: it must set the theme before the body paints, or every page flashes white
		echo '<script type="text/javascript" src="' . $this->versioned_file( 'dark_theme.js' ) . '"'
			. ' data-label-dark="' . string_attribute( plugin_lang_get( 'switch_to_dark' ) ) . '"'
			. ' data-label-light="' . string_attribute( plugin_lang_get( 'switch_to_light' ) ) . '"'
			. '></script>', "\n";
	}

	# plugin_file.php lets browsers cache for 3 hours; the mtime makes each edited file a new URL
	private function versioned_file( $p_file ) {
		return plugin_file( $p_file ) . '&amp;v=' . filemtime( __DIR__ . '/files/' . $p_file );
	}
}
