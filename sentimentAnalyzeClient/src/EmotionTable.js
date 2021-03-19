import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        let emotions = this.props.emotions;
        console.log(emotions);
        let listOfEmotionsAsArray = Object.entries(emotions);
        console.log(listOfEmotionsAsArray);

        let emotionsDetails = listOfEmotionsAsArray.map((emotionDetail)=>{
                return <tr>
                        <td style={{color: "black",border: "1px solid black"}}>{emotionDetail[0]} </td>
                        <td style={{color: "black",border: "1px solid black"}}>{emotionDetail[1]} </td>
                    </tr>
                })
        console.log(emotionsDetails);

      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
                emotionsDetails
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
