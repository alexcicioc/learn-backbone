const Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }
});

const Blogs = Backbone.Collection.extend({});

const blogs = new Blogs([]);

const BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function () {
        this.template = _.template($('.blog-list-template').html());
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

const BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('#blogList'),
    initialize: function () {
        this.model.on('add', this.render, this);
    },
    render: function () {
        this.$el.html('');
        _.each(this.model.toArray(), (blog) => {
            this.$el.append(
                (new BlogView({model: blog})).render().$el
            );
        });
        return this;
    }
});

$('.add-blog').click(() => {
    console.log('aaa');
    const blog = new Blog({
        author: $('.author-input').val(),
        title: $('.title-input').val(),
        url: $('.url-input').val()
    });
    blogs.add(blog);
});

const blogsView = new BlogsView();
