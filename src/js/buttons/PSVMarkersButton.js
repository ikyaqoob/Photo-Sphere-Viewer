import { EVENTS } from '../data/constants';
import { AbstractButton } from './AbstractButton';

/**
 * @summary Navigation bar markers button class
 * @extends module:components/buttons.AbstractButton
 * @memberof module:components/buttons
 */
class PSVMarkersButton extends AbstractButton {

  static get id() {
    return 'markers';
  }

  static get icon() {
    return 'pin';
  }

  /**
   * @param {module:components.PSVNavbar} navbar
   */
  constructor(navbar) {
    super(navbar, 'psv-button--hover-scale psv-markers-button');

    this.psv.on(EVENTS.SHOW_HUD, this);
    this.psv.on(EVENTS.HIDE_HUD, this);

    this.hide();
  }

  /**
   * @override
   */
  destroy() {
    this.psv.off(EVENTS.SHOW_HUD, this);
    this.psv.off(EVENTS.HIDE_HUD, this);

    super.destroy();
  }

  /**
   * @override
   */
  refresh() {
    if (this.psv.hud.getNbMarkers() === 0) {
      this.hide();
    }
    else {
      this.show();
    }
  }

  /**
   * @summary Handles events
   * @param {Event} e
   * @private
   */
  handleEvent(e) {
    /* eslint-disable */
    switch (e.type) {
      // @formatter:off
      case EVENTS.SHOW_HUD: this.toggleActive(true); break;
      case EVENTS.HIDE_HUD: this.toggleActive(false); break;
      // @formatter:on
    }
    /* eslint-enable */
  }

  /**
   * @override
   * @description Toggles markers
   */
  __onClick() {
    if (this.psv.hud.isVisible()) {
      this.psv.hud.hide();
    }
    else {
      this.psv.hud.show();
    }
  }

}

export { PSVMarkersButton };
