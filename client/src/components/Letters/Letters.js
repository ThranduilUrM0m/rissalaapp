import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import { pagination } from 'paginationjs';
import Fingerprint from 'fingerprintjs';
import Footer from '../Footer/Footer';
import $ from 'jquery';
import jQuery from 'jquery';

var _ = require('lodash');

class Letters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            _from: [],
            _from_adresse: '',
            _from_city: '',
            _from_country: '',
            _to: [],
            _to_student: '',
            _to_school: '',
            _to_grade: '',
            _to_city: '',
            _to_country: '',
            _body: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this._handleSlider = this._handleSlider.bind(this);
    }
    componentDidMount() {
        const {onLoad} = this.props;
        const self = this;
        axios('http://localhost:8000/api/letters')
        .then(function (response) {
            // handle success
            onLoad(response.data);
            function runAfterElementExists(jquery_selector, callback){
                var checker = window.setInterval(function() {
                //if one or more elements have been yielded by jquery
                //using this selector
                if ($(jquery_selector).length) {
                    //stop checking for the existence of this element
                    clearInterval(checker);
                    //call the passed in function via the parameter above
                    callback();
                }}, 200); //I usually check 5 times per second
            }
            //this is an example place in your code where you would like to
            //start checking whether the target element exists
            //I have used a class below, but you can use any jQuery selector
            runAfterElementExists(".card_"+(response.data.letters.length-1), function() {
                self._handleSlider();
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.letterToEdit) {
            this.setState({
                _from: nextProps.letterToEdit._from,
                _to: nextProps.letterToEdit._to,
                _body: nextProps.letterToEdit._body,
            });
        }
    }
    handleSubmit(){
        this.setState(state => ({
            _from: {author: localStorage.getItem('email'), adresse: this.state._from_adresse, city: this.state._from_city, country: this.state._from_country},
            _to: {student: this.state._to_student, school: this.state._to_school, grade: this.state._to_grade, city: this.state._to_city, country: this.state._to_country}
        }), () => {
            const { onSubmit, letterToEdit, onEdit } = this.props;
            const { _from, _to, _body } = this.state;
            const self = this;
            if(!letterToEdit) {
                return axios.post('http://localhost:8000/api/letters', {
                    _from,
                    _to,
                    _body,
                })
                    .then((res) => onSubmit(res.data))
                    .then(function() {
                        self.setState({ 
                            _from: [],
                            _from_adresse: '',
                            _from_city: '',
                            _from_country: '',
                            _to: [],
                            _to_student: '',
                            _to_school: '',
                            _to_grade: '',
                            _to_city: '',
                            _to_country: '',
                            _body: '',
                        })
                    });
            } else {
                return axios.patch(`http://localhost:8000/api/letters/${letterToEdit._id}`, {
                    _from,
                    _to,
                    _body,
                })
                    .then((res) => onEdit(res.data))
                    .then(function() {
                        self.setState({ 
                            _from: [],
                            _from_adresse: '',
                            _from_city: '',
                            _from_country: '',
                            _to: [],
                            _to_student: '',
                            _to_school: '',
                            _to_grade: '',
                            _to_city: '',
                            _to_country: '',
                            _body: '',
                        })
                    });
            }
        });
    }
    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }
    _handleSlider() {
        function FormatNumberLength(num, length) {
            var r = "" + num;
            while (r.length < length) {
                r = "0" + r;
            }
            return r;
        }
        (function($) {
            $.fn.jooSlider = function(options) {
                var opt = {
                    auto: true,
                    speed: 2000
                };
                if (options) {
                    $.extend(opt, options);
                }
                var container = $(this);
                var Slider = function() {
                    //===========
                    // Variables
                    //===========
                    var block = false; // Empêcher le clique multiple
                    var height = container.find('.card').height(); // Hauteur des images
                    container.find('.card').wrap('<div class="img-wrap"></div>');
                    this.imgs = container.find('.img-wrap');
                    this.imgCount = (this.imgs.length) - 1;
                    /* Caption */
                    this.imgs.each(function(){
                        var caption = $(this).find('.card').data('index');
                        caption = FormatNumberLength(JSON.parse(caption), 2);
                        $(this).append('<p class="index_card">'+caption+'.</p>');
                    });
                    this.captions = container.find('.img-wrap').find('p');
                    /* Controls */
                    container.append('<span id="controls"><a href="#" id="prev"><span id="prev_"></span>prev.</a><a href="#" id="next">next.<span id="next_"></span></a></span>');
                    this.navNext = $('#next');
                    this.navPrev = $('#prev');
                    /* Navigation */
                    container.after('<ol class="nav carousel-indicators"></ol>');
                    var nav = $(".nav");
                    this.imgs.each(function(){
                        var caption = $(this).find('img').attr('title');
                        nav.append('<li href="#">'+ caption +'</li>');
                    });
                    this.bullets = nav.find("li");
                    //==========
                    // Méthodes
                    //==========
                    /*
                     *   Méthode qui retourne l'index de la div.current
                     */
                    this.getCurrentIndex = function() {
                        return this.imgs.filter('.current').index();
                    };
                    /*
                     *   Méthode qui anime le slide de haut en bas ou de bas en haut
                     */
                    this.goNext = function(index) {
                        /* Images */
                        this.imgs.filter(".current").stop().animate({ // Monte l'image current
                            "top": -height + "px"
                        }, function() {
                            $(this).hide();
                        });
                        this.imgs.removeClass("current"); // Supprime classe current
                        this.imgs.eq(index).css({ // Monte la suivante et attribut la classe current
                            "top": height + "px"
                        }).show().stop().animate({
                            "top": "0px"
                        }, function() {
                            block = false;
                        }).addClass("current");
                        /* Bullets */
                        this.bullets.removeClass("current").eq(index).addClass("current");
                    }; //////////////////////// END GO NEXT
                    this.goPrev = function(index) {
                        /* Images */
                        this.imgs.filter(".current").stop().animate({
                            "top": height + "px"
                        }, function() {
                            $(this).hide();
                            block = false;
                        });
                        this.imgs.removeClass("current");
                        this.imgs.eq(index).css({
                            "top": -height + "px"
                        }).show().stop().animate({
                            "top": "0px"
                        }, function() {
                        }).addClass("current");
                        /* Bullets */
                        this.bullets.removeClass("current").eq(index).addClass("current");
                    }; //////////////////////// END GO PREV
                    this.next = function() {
                        var index = this.getCurrentIndex();
                        if (index < this.imgCount) {
                            if (block !== true) {
                                this.goNext(index + 1); // Go next 
                            }
                        } else {
                            if (block !== true) {
                                this.goNext(0); // If last go first 
                            }
                        }
                        block = true;
                    }; //////////////////////// END NEXT
                    this.prev = function() {
                        var index = this.getCurrentIndex();
                        if (index > 0) {
                            if (block !== true) {
                                this.goPrev(index - 1); // Go previous 
                            }
                        } else {
                            if (block !== true) {
                                this.goPrev(this.imgCount); // If first go last     
                            }
                        }
                        block = true;
                    }; //////////////////////// END PREV
                    /*
                     *   Méthode qui initialise l'objet
                     */
                    this.init = function() {
                        this.imgs.hide().first().addClass('current').show();
                        this.bullets.first().addClass("current");
                    };
                }; // End Slider Object
                var slider = new Slider();
                slider.init();
                //==========
                //  EVENTS
                //==========
                /* Click */
                slider.navNext.click(function(e) { // Click next button
                    e.preventDefault();
                    clearInterval(interval);
                    interval = setInterval(timer, opt.speed);
                    slider.next();
                });
                slider.navPrev.click(function(e) { // Click previous button
                    e.preventDefault();
                    slider.prev();
                    clearInterval(interval);
                    interval = setInterval(timer, opt.speed);
                });
                slider.bullets.click(function(e) { // Click numbered bullet
                    e.preventDefault();
                    var imgIndex = slider.getCurrentIndex();
                    var bulletIndex = $(this).index();
                    if (imgIndex < bulletIndex) {
                        slider.goNext(bulletIndex);
                    } else {
                        slider.goPrev(bulletIndex);
                    }
                    clearInterval(interval);
                    interval = setInterval(timer, opt.speed);
                });
                /* Interval */
                var interval = setInterval(timer, opt.speed);
                if (opt.auto === true) {
                    var timer = function() {
                        slider.next();
                    };
                }
                container.hover(function() {
                    clearInterval(interval);
                }, function() {
                    clearInterval(interval);
                    interval = setInterval(timer, opt.speed);
                });
                return this;
            };
        })(jQuery);
        $("#slider").jooSlider({
            auto: false,
            speed: 4000
        });
    }
    render() {
        const { letters } = this.props;
        const { _from_adresse, _from_city, _from_country, _to_student, _to_school, _to_grade, _to_city, _to_country, _body } = this.state;
        return(
            <FullPage scrollMode={'normal'}>
				<Slide>
					<section className="first_section_letters">
                        <div className="wrapper_full">
                            <div id="slider">
                                {
                                    _.orderBy(letters, ['createdAt'], ['desc']).map((letter, index) => {
                                        return (
                                            <div className={"card card_" + index} data-title={_.head(_.words(letter._body))} data-index={index+1}>
                                                <div className="shadow_title">{_.head(_.words(letter._body))}</div>
                                                <div className="card-body">
                                                    <div className="_from">
                                                        <p>{letter._from.adresse}</p>
                                                        <p>{letter._from.city}, {letter._from.country}</p>
                                                        <p>{moment(letter.createdAt).format('dddd, MMMM Do YYYY')}</p>
                                                    </div>
                                                    <div className="_to">
                                                        <p>To {letter._to.student}</p>
                                                        <p>{letter._to.grade}, {letter._to.school}</p>
                                                        <p>{letter._to.city}, {letter._to.country}</p>
                                                    </div>
                                                    <div className="_body">
                                                        <p>{letter._body}</p>
                                                    </div>
                                                    <div className="_signature">
                                                        <p className="text-muted author">by <b>{letter._from.author}</b></p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
							<div id="social_media">
								<div className="icons_gatherer">
									<a href="#" className="icon-button instagram"><i className="fab fa-instagram"></i><span></span></a>
									<a href="#" className="icon-button facebook"><i className="icon-facebook"></i><span></span></a>
									<a href="#" className="icon-button scroll">
										<span className="scroll-icon">
											<span className="scroll-icon__wheel-outer">
												<span className="scroll-icon__wheel-inner"></span>
											</span>
										</span>
									</a>
								</div>
							</div>
                        </div>
                    </section>
				</Slide>
                {/* <Slide>
                    <section className="first_section_letters">
                        <div className="wrapper_full">
                            <div className="wrapper_form">
                            <input
                            onChange={(ev) => this.handleChangeField('_from_adresse', ev)}
                            value={_from_adresse}
                            className="form-control my-3 _from_adresse_letter"
                            placeholder="_from_adresse"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_from_city', ev)}
                            value={_from_city}
                            className="form-control my-3 _from_city_letter"
                            placeholder="_from_city"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_from_country', ev)}
                            value={_from_country}
                            className="form-control my-3 _from_country_letter"
                            placeholder="_from_country"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_to_student', ev)}
                            value={_to_student}
                            className="form-control my-3 _to_student_letter"
                            placeholder="_to_student"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_to_school', ev)}
                            value={_to_school}
                            className="form-control my-3 _to_school_letter"
                            placeholder="_to_school"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_to_grade', ev)}
                            value={_to_grade}
                            className="form-control my-3 _to_grade_letter"
                            placeholder="_to_grade"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_to_city', ev)}
                            value={_to_city}
                            className="form-control my-3 _to_city_letter"
                            placeholder="_to_city"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_to_country', ev)}
                            value={_to_country}
                            className="form-control my-3 _to_country_letter"
                            placeholder="_to_country"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_body', ev)}
                            value={_body}
                            className="form-control my-3 _body_letter"
                            placeholder="_body"
                            />
                            <button onClick={this.handleSubmit} className="btn btn-primary float-right submit_letter">Submit</button>
                        </div>
                        </div>
                    </section>
                </Slide> */}
				<Slide>
					<Footer/>
				</Slide>
            </FullPage>
        )
    }
}

const mapStateToProps = state => ({
    letters: state.home.letters,
});

const mapDispatchToProps = dispatch => ({
    onLoad: data => dispatch({ type: 'LETTER_PAGE_LOADED', data }),
    onSubmit: data => dispatch({ type: 'SUBMIT_LETTER', data }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Letters) 