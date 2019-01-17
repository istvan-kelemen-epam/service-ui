import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { injectIntl, defineMessages, intlShape } from 'react-intl';
import { activeProjectSelector } from 'controllers/user';
import { withModal, ModalLayout } from 'components/main/modal';
import { COMMON_LOCALE_KEYS } from 'common/constants/localization';
import { showScreenLockAction } from 'controllers/screenLock';
import { WidgetInfoSection } from './widgetInfoSection';
import { SharedWidgetsListSection } from './sharedWidgetsListSection';
import styles from './addSharedWidgetModal.scss';

const cx = classNames.bind(styles);

const messages = defineMessages({
  headerText: {
    id: 'AddSharedWidgetModal.headerText',
    defaultMessage: 'Add shared widget',
  },
});

@withModal('addSharedWidgetModal')
@connect(
  (state) => ({
    projectId: activeProjectSelector(state),
  }),
  {
    showScreenLockAction,
  },
)
@injectIntl
export class AddSharedWidgetModal extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    showScreenLockAction: PropTypes.func.isRequired,
    data: PropTypes.shape({
      onConfirm: PropTypes.func,
    }),
    projectId: PropTypes.string,
    currentDashboard: PropTypes.object,
  };

  static defaultProps = {
    data: {
      onConfirm: () => {},
    },
    projectId: '',
    currentDashboard: {},
  };

  state = {
    selectedWidget: null,
  };

  onSelectWidget = (selectedWidget) => this.setState({ selectedWidget });

  onAdd = (closeModal) => {
    const {
      data: { onConfirm },
    } = this.props;
    this.props.showScreenLockAction();
    const widget = {
      widgetId: this.state.selectedWidget.id,
      widgetPosition: { positionX: 0, positionY: 0 },
      widgetSize: { width: 12, height: 7 },
    };
    onConfirm(widget, closeModal);
  };

  render() {
    const {
      intl: { formatMessage },
      projectId,
      currentDashboard,
    } = this.props;
    const okButton = {
      text: formatMessage(COMMON_LOCALE_KEYS.ADD),
      onClick: this.onAdd,
      disabled: !this.state.selectedWidget,
    };
    const cancelButton = {
      text: formatMessage(COMMON_LOCALE_KEYS.CANCEL),
    };

    return (
      <ModalLayout
        title={formatMessage(messages.headerText)}
        okButton={okButton}
        cancelButton={cancelButton}
        className={cx('add-shared-widget-modal')}
      >
        <div className={cx('shared-widget-modal-content')}>
          <WidgetInfoSection selectedWidget={this.state.selectedWidget} projectId={projectId} />
          <SharedWidgetsListSection
            projectId={projectId}
            currentDashboard={currentDashboard}
            selectedWidget={this.state.selectedWidget}
            onSelectWidget={this.onSelectWidget}
          />
        </div>
      </ModalLayout>
    );
  }
}