<template>
    <div v-if="dataloaded">
        <div class="margin_60"></div>
		<div class="site_container inside_page_content page_content" v-if="currentPost">
            <div class="row">
                <div class="col-md-12">
			        <p class="back_to_list"><i class="fa fa-angle-left"></i>&nbsp;<router-link to="/blog">Back to What's New</router-link></p>
			    </div>
				<div class="col-sm-12">
					<h3 class="promo_name">{{ currentPost.title }}</h3>
					<div class="promo_div_date">
					    <p>{{ currentPost.publish_date | moment("MMMM DD, YYYY", timezone) }}</p>
						
						<social-sharing :url="$root.shareURL('blog', currentPost.slug)" :title="currentPost.title" :description="currentPost.body" :quote="_.truncate(currentPost.description, {'length': 99})" :twitter-user="$root.twitter_user" :media="currentPost.image_url" inline-template >
							<div class="blog-social-share pull-right">
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
					<img :src="currentPost.image_url" :alt="currentPost.title" />
                </div>
			</div>
            <div class="row">
                <div class="margin_40"></div>
                <div class="col-md-8">
                    <div class="post_details_container right_border">
                        <div class="post_text" v-html="currentPost.html_body"></div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="previous_post_container">
                        <h3 class="previous_post_title">Previous Posts</h3>
                        <ul v-if="relatedPosts.length > 0">
                            <li v-for="(post, index) in relatedPosts">
                                <router-link :to="'/blog/' + post.slug" class="" :aria="post.title">
					                <h4>{{ post.title }}</h4>
				                </router-link>
                            </li>
                        </ul>
                        <p v-else>No previous posts</p>
                    </div>   
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-social-sharing"], function (Vue, Vuex, moment, tz, VueMoment, SocialSharing) {
        return Vue.component("blog-details-component", {
            template: template, // the variable template will be injected,
            props: ['id'],
            data: function () {
                return {
                    dataloaded: false,
                    currentPost: null
                }
            },
            watch: {
                $route: function () {
                    this.updateCurrentBlog(this.$route.params.id);
                },
            },
            created() {
                this.loadData().then(response => {
                    this.updateCurrentBlog(this.id);
                    this.dataloaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'blogs',
                    'findBlogByName',
                    'findBlogPostBySlug'
                ]),
                relatedPosts () {
                    var blog_posts = _.reverse(_.orderBy(this.findBlogByName("Sevenoaks Shopping Centre").posts, function (o) { return o.publish_date }));
                    console.log("blog_posts", blog_posts)

                    var current_post_date = this.currentPost.publish_date
                    var current_post_id = this.currentPost.id

                    var prev_posts = [];
                    _.forEach(blog_posts, function(value, key) {
                        if (value.id != current_post_id) {
                            if (value.publish_date <= current_post_date){
                                prev_posts.push(value); 
                            }
                        }
                    });
                    prev_posts = _.slice(prev_posts, 0, 3)
                    return prev_posts
                }
            },
            methods: {
                loadData: async function () {
                    try {
                        let results = await Promise.all([
                            this.$store.dispatch("getData", "blogs")
                        ]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                updateCurrentBlog(id) {
                    var blogName = "Sevenoaks Shopping Centre";
                    this.currentPost = this.findBlogPostBySlug(blogName, id);
                    if (this.currentPost === null || this.currentPost === undefined) {
                        this.$router.replace({ name: '/' });
                    }
                }
            }
        });
    });
</script>