<template>
    <div v-if="dataloaded">
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content">
					<h1>What's New</h1>
				</div>
			</div>
    	</div>
        <div class="margin_60"></div>
		<div class="site_container inside_page_content page_content">
            <div class="post_container" v-for="(post, index) in blogs"  v-if="showMore > index" :key="index">
                <div class="post_image">
                    <img :src="post.image_url" :alt="'Blog Post: ' + post.title">
                </div>
                <div class="post_content">
                    <h2 class="post_heading caps">{{ post.title }}</h2>
                    <p class="post_dates">{{ post.publish_date | moment("MMMM DD, YYYY", timezone) }}</p>
                    <div class="post_text" v-html="post.body_short"></div>
                    <router-link :to="{ name: 'blogDetails', params: { id: post.slug }}" class="post_read_more link_hover"  :aria="post.title">
					   {{ $t("blog_page.read_post") }} <i class="fa fa-angle-right" aria-hidden="true"></i>
				    </router-link>
			        <social-sharing :url="shareURL(post.slug)" :title="post.title" :description="post.body" :quote="_.truncate(post.description, {'length': 99})" twitter-user="BCCstyle" :media="post.image_url" inline-template >
						<div class="post_list_share">
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
            <div class="row">
                <div class="col-md-12 text-center">
                    <button class="contact_btn" id="load_more" v-if="blogs && showMore <= blogs.length" @click ="loadMore()">Load More</button>
                    <p v-else>No More Posts</p> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-social-sharing"], function (Vue, Vuex, moment, tz, VueMoment, SocialSharing) {
        return Vue.component("blog-component", {
            template: template, // the variable template will be injected
            data: function () {
                return {
                    dataloaded: false,
                    pageBanner: null,
                    showMore: 3,
                    incrementBy: 3
                }
            },
            created() {
                this.loadData().then(response => {
                    var temp_repo = this.findRepoByName('Blog Banner');
                    if (temp_repo && temp_repo.images) {
                        this.pageBanner = temp_repo.images[0];
                    } else {
                        this.pageBanner = {};
                        this.pageBanner.image_url = "";
                    }
                    
                    this.dataloaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findRepoByName',
                    'blogs',
                    'findBlogByName'
                ]),
                blogs() {
                    var blog = this.findBlogByName("Sevenoaks Shopping Centre").posts;
                    var vm = this;
                    var temp_blog = [];
                    _.forEach(blog, function(value, key) {
                        today = moment().tz(vm.timezone);
                        webDate = moment(value.publish_date).tz(vm.timezone);
                        if (today >= webDate) {
                            if (_.includes(value.image_url, 'missing')) {
                                value.image_url = "//codecloud.cdn.speedyrails.net/sites/5c0581a36e6f643f53050000/image/jpeg/1527006352000/bccblogplaceholder.jpg";
                            }
                            value.body_short = _.truncate(value.body, { 'length': 150, 'separator': ' ' });
                            
                            temp_blog.push(value);
                        }
                    });
                    blog = _.reverse(_.sortBy(temp_blog, function (o) { return o.publish_date }));
                    return blog
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "blogs")
                        ]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                loadMore() {
                    if (this.showMore <= this.blogs.length) {
                        var num = this.showMore + this.incrementBy;
                        this.showMore = num;
                    }
                },
                shareURL(slug) {
                    var share_url = "https://www.shopsevenoaks.com/blog/" + slug
                    return share_url
                }
            }
        });
    });
</script>