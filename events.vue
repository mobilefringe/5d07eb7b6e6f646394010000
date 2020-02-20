<template>
	<div v-if="dataloaded">
		<div class="page_header" v-if="pageBanner" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content caps">
					<h1>Events & Contests</h1>
					<h2 style="display:none;">Scroll to  view events</h2>
					<h3 style="display:none;">View all events below</h3>
				</div>
			</div>
		</div>
		<div class="site_container page_content" id="events_container">
			<div v-if="itemList.length > 0">
        		<div class="row event_container" v-if="showMore > index" v-for="(promo, index) in itemList">				
        		    <div class="col-sm-6 col-md-3 event_image_container">
						<div class="image_container details_store_image">
                            <img  class="center-block" :src="promo.promo_img" :alt="promo.name" />
						</div>
					</div>
					<div class="col-sm-6 col-md-8 event_dets_container">
						<h4 class="event_name caps">{{promo.name}}</h4>
						<div class="event_thick_line"></div>
						<p class="event_dates" v-if="isMultiDay(promo)">{{ promo.start_date | moment("MMMM D", timezone)}} - {{ promo.end_date | moment("MMMM D", timezone)}}</p>
                        <p class="event_dates" v-else>{{ promo.start_date | moment("MMMM D", timezone)}}</p>
						<p class="event_desc">{{promo.description_short}}</p>
						<div class="text-right col-md-6 col-sm-12 promo_link" v-if="promo">
							<router-link v-if="promo.eventable_type" :to="'/event/' + promo.slug" class="event_learn_more pull-left" :aria="promo.name">
							    View Event Details <i class="fa fa-angle-right" aria-hidden="true"></i>
						    </router-link>
						    <a v-else :href="'/contest/' + promo.slug" class="event_learn_more pull-left" :aria="promo.name">
							    View Contest Details <i class="fa fa-angle-right" aria-hidden="true"></i>
						    </a>
							<social-sharing :url="$root.shareURL('events',promo.slug)" :title="promo.title" :description="promo.body" :quote="_.truncate(promo.description, {'length': 99})" :twitter-user="$root.twitter_user" :media="promo.image_url" inline-template >
								<div class="blog-social-share pull_right">
									<div class="social_share">
										<network network="facebook">
											<i class="fa fa-facebook social_icons" aria-hidden="true"></i>
										</network>
										<network network="twitter">
											<i class="fa fa-twitter social_icons" aria-hidden="true"></i>
										</network>
									</div>
								</div>
							</social-sharing>
						</div>
					</div>
					<div class="col-sm-12">
						<hr>
					</div>
				</div>
			</div>
			<div id="no_events" class="row" v-else>
				<div class="col-md-12">
					<p>There are no Events or Contests scheduled at this time. Please check back soon!</p>
				</div>
			</div>
			<div class="show_more"  v-if="itemList && showMore < itemList.length">
              <div class="contact_btn subscribe_btn pointer" @click="loadMoreItems()">Load More</div>
            </div>
		</div>
	</div>
</template>

<style>
    .events_container .social_share network {
        display:inline-block;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }
    .events_container .social_share .social_icons{
        width : 24px;
        height : 24px;
        display:inline;
        margin: 0 2px;
    }
</style>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment"], function(Vue, Vuex, moment, tz, VueMoment) {
        return Vue.component("events-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataloaded: false,
                    pageBanner: null,
                    incrementBy: 5,
                    showMore: 5,
                    itemList: null
                }
            },
            created() {
                this.loadData().then(response => {
                    var temp_repo = this.findRepoByName('Events & Contests Banner');
                    if (temp_repo && temp_repo.images) {
                        this.pageBanner = temp_repo.images[0];
                    } else {
                        this.pageBanner = {};
                        this.pageBanner.image_url = "";
                    }
                    
                    if (this.events) {
                        if (this.contests) {
                            this.itemList = _.concat(this.events, this.contests);
                            this.itemList = _.sortBy(this.itemList, ['end_date']);
                        } else {
                            this.itemList = _.sortBy(this.events, ['end_date']);
                        }
                    }
                    console.log("items",  this.itemList)
                    this.dataloaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findRepoByName',
                    'processedEvents',
                    'processedContests'
                ]),
                events() {
                    var vm = this;
                    var temp_promo = [];
                    _.forEach(this.processedEvents, function(value, key) {
                        today = moment().tz(vm.timezone);
                        webDate = moment(value.show_on_web_date).tz(vm.timezone);
                        if (today >= webDate) {
                            value.description_short = _.truncate(value.description, { 'length': 150 });
                            value.description_short_2 = _.truncate(value.description_2, { 'length': 150 });
                            
                            if (_.includes(value.image_url, 'missing')) {
                                value.promo_img = vm.property.default_logo_url;
                            } else if (value.store == null || value.store == undefined) {
                                value.promo_img = value.image_url;
                            }
                            temp_promo.push(value);
                        }
                    });

                    return temp_promo;
                },
                contests() {
                    var vm = this;
                    var temp_promo = [];
                    _.forEach(this.processedContests, function(value, key) {
                        today = moment().tz(vm.timezone);
                        webDate = moment(value.show_on_web_date).tz(vm.timezone);
                        if (!_.includes(value.name, "Kids Club")) {
                            if (today >= webDate) {
                                value.description_short = _.truncate(value.description, { 'length': 150 });
                                value.description_short_2 = _.truncate(value.description_2, { 'length': 150 });
    
                                if (_.includes(value.image_url, 'missing')) {
                                    value.promo_img = vm.property.default_logo_url;
                                } else if (value.store == null || value.store == undefined) {
                                    value.promo_img = value.image_url;
                                }
                                
                                temp_promo.push(value);
                            }
                        }
                    });

                    return temp_promo; 
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "events"),
                            this.$store.dispatch("getData", "contests"), 
                            this.$store.dispatch("getData", "repos")
                        ]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                loadMoreItems() {
                  if (this.showMore <= this.itemList.length) {
                    var num = this.showMore + this.incrementBy;
                    this.showMore = num;
                  }
                },
                isMultiDay(item) {
					var timezone = this.timezone
					var start_date = moment(item.start_date).tz(timezone).format("MM-DD-YYYY")
					var end_date = moment(item.end_date).tz(timezone).format("MM-DD-YYYY")
					if (start_date === end_date) {
						return false
					} else {
						return true
					}
				}
            }
        });
    });
</script>