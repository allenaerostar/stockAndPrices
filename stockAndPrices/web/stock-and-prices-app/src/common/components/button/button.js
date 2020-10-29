import React from 'react';

class Button extends React.Component{
    constructor(props){
        super(props);
        this.labelText = this.props.labelText ? this.props.labelText: "Submit";
        this.type = this.props.buttonType ? this.props.buttonType: "button";
        this.onClickHandler = this.props.onClick ? this.props.onClick: undefined;
    }

    render () {
        return (
            <button type={this.type} onClick={this.onClickHandler}>
                {this.labelText}
            </button>
        );
    }
}

export default Button;