import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { ListRenderer, PageContainer, PageHeader, LoaderButton } from "enscript-reusables";
import { fetchPosts } from "../../actions/post-actions";
import { FETCHING_POSTS } from "../../config/loading-entries";

const AllPosts = ({ loading, posts, fetchPosts }) => {
	return (
		<div id="all-post-page" className="main-page">
			<PageContainer asContainer>
				<PageHeader title="My Posts" />

				<br />

				<div className="text-center">
					<LoaderButton className="btn btn-primary" isLoading={loading.includes(FETCHING_POSTS)} onClick={fetchPosts}>
						Load my posts from service-provider app
					</LoaderButton>
				</div>

				<br />

				{!loading.includes(FETCHING_POSTS) && (
					<ListRenderer items={posts} attrs={[{ label: "Title", value: "title" }, { label: "Content", value: "content" }]}  />
				)}
			</PageContainer>
		</div>
	);
};

AllPosts.propTypes = {
	loading: PropTypes.array,
	posts: PropTypes.array,
	fetchPosts: PropTypes.func
};

export default connect(
	state => ({
		loading: state.loading,
		posts: state.post.collection
	}),
	{ fetchPosts }
)(AllPosts);
