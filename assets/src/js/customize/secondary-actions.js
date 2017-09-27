import React from 'react';

import ActionButton from './action-button';

const l10n = ClientdashCustomize_Data.l10n || false;

/**
 * Secondary actions for panels.
 *
 * @since {{VERSION}}
 */
class SecondaryActions extends React.Component {

    constructor(props) {

        super(props);

        this.loadNextPanel     = this.loadNextPanel.bind(this);
        this.loadPreviousPanel = this.loadPreviousPanel.bind(this);
    }

    loadNextPanel() {

        this.props.onLoadPanel(this.props.nextPanel, 'forward');
    }

    loadPreviousPanel() {

        this.props.onLoadPanel(this.props.previousPanel, 'backward');
    }

    render() {
        return (
            <div className="cd-editor-secondary-actions">
                {this.props.title &&
                <div className="cd-editor-panel-actions-title">
                    {this.props.title}
                </div>
                }

                {(this.props.previousPanel || this.props.nextPanel) &&
                <div className="cd-editor-panel-actions-buttons">
                    {this.props.previousPanel &&
                    <ActionButton
                        title={l10n['action_button_back']}
                        text={<span className="fa fa-chevron-left"/>}
                        align="left"
                        onHandleClick={this.loadPreviousPanel}
                        disabled={this.props.disabled}
                    />
                    }

                    {this.props.nextPanel &&
                    <ActionButton
                        title={this.props.loadNextText}
                        text={<span className="fa fa-plus"/>}
                        align="right"
                        onHandleClick={this.loadNextPanel}
                        disabled={this.props.disabled}
                    />
                    }

                    {this.props.nextPanelNotification &&
                    <div className="cd-editor-panel-actions-notification cd-editor-tip cd-editor-tip-above next">
                        {this.props.nextPanelNotification}
                    </div>
                    }
                </div>
                }
            </div>
        )
    }
}


/**
 * Secondary actions for the Primary panel.
 *
 * @since {{VERSION}}
 */
class SecondaryActionsPrimary extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            confirming: false
        }

        this.resetRole    = this.resetRole.bind(this);
        this.cancelReset  = this.cancelReset.bind(this);
        this.confirmReset = this.confirmReset.bind(this);
    }

    resetRole() {

        if ( this.props.deleting ) {

            return;
        }

        this.props.onResetRole();

        this.setState({
            confirming: false
        });
    }

    confirmReset() {

        this.props.onConfirmReset();

        this.setState({
            confirming: true,
        });
    }

    cancelReset() {

        this.props.onCancelReset();

        this.setState({
            confirming: false
        });
    }

    render() {

        return (
            <div className="cd-editor-secondary-actions">
                <div className="cd-editor-panel-actions-buttons">

                    {(!this.state.confirming && !this.props.deleting) &&
                    <ActionButton
                        title={l10n['reset_role']}
                        text={<span className="fa fa-trash"/>}
                        align="left"
                        type="delete"
                        disabled={this.props.resettable}
                        onHandleClick={this.confirmReset}
                    />}

                    {(this.state.confirming && !this.props.deleting) &&
                    <ActionButton
                        title={l10n['cancel']}
                        text={<span className="fa fa-ban" />}
                        align="left"
                        onHandleClick={this.cancelReset}
                    />}

                    {(this.state.confirming || this.props.deleting) &&
                    <ActionButton
                        title={l10n['confirm']}
                        text={this.props.deleting ? <span className="fa fa-circle-o-notch fa-spin"/> :
                            <span className="fa fa-check"/>}
                        align="right"
                        type="delete"
                        onHandleClick={this.resetRole}
                    />}

                </div>
            </div>
        )
    }
}

export {
    SecondaryActions,
    SecondaryActionsPrimary
}