import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselComponent from "./CarouselComponent";

const {width, height} = Dimensions.get("window")
const entries= [
    1,2,3,4,5
]
export default class CarouselBanner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeSlide: 0,
            activeDotIndex: 0
        }
    }

    componentDidMount(){
        setInterval(() => {
            this.setState({activeSlide: (this.state.activeSlide+1)%entries.length})
            this._carouselRef.snapToItem( this.state.activeSlide != null ? this.state.activeSlide : 0 );
        }
            , 2000)
    }

    get pagination() {
        const { activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={{ position: "absolute", bottom: -10, alignSelf: "center" }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: '#2196f3'
                }}
                inactiveDotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}  // Define styles for inactive dots here
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    _renderItem = ({item, index}) => {
        return (
            <CarouselComponent index={index} />
        );
    }

    render() {
        return (
            <View>
                <Carousel
                    ref={ ref => { this._carouselRef = ref; } }
                    data={entries}
                    renderItem={this._renderItem}
                    style={{ width: 600 }}
                    sliderWidth={width}
                    itemWidth={width - 20}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                { this.pagination}
            </View>
        );
    }
}

const styles = StyleSheet.create({

})