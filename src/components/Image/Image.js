import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      classes: "image-root",
      isRotated: false,
      expanded: false
    };
  }

  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  rotate() {
         this.setState({isRotated: !this.state.isRotated}, () => {
             if(this.state.isRotated){
                 this.state.classes += " rotate";
                 this.setState({classes: this.state.classes});
             }
             else{
                 this.setState({classes: this.state.classes.replace(" rotate", "")});
             }
         });
     }


  expand(){
         this.setState({expanded: !this.state.expanded}, () => {
             if(this.state.expanded){
                 this.setState({classes: this.state.classes += " expand"});
             }
             else{
                 this.setState({classes: this.state.classes.replace(" expand", "")});
             }
           });
           }


  render() {
    return (


      <div className="image-container">
                   <div
                       className={this.state.classes}
                       style={{
                           backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
                           width: this.state.size + 'px',
                           height: this.state.size + 'px'
                       }}
                   >
</div>
        <div className= "buttons">
           <FontAwesome onClick={() => { this.rotate(); }} className="image-icon" name="sync-alt" title="rotate" />
           <div onClick={() => this.props.onPassValue(this.props.dto)}>
            <FontAwesome className="image-icon" name="trash-alt" title="delete"/>
          </div>
          <FontAwesome onClick={() => { this.expand(); }} className="image-icon" name="expand" title="expand" />
        </div>
      </div>
    );
  }
}

export default Image;
