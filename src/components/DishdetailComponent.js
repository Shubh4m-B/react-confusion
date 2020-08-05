import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

// renderDish function for rendering the Dish
function renderDish(dish) {
	if (dish == null) {
		return <div />;
	}

	return (
		<div className="col-12 col-md-5 m-2">
			<Card>
				<CardImg width="100%" src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
}

// Render all the comments corresponding to the selected dish
function renderComments(comments) {
	if (comments == null) {
		return <div />;
	}

	const com = comments.map((comment) => {
		return (
			<li key={comment.id}>
				<p>{comment.comment}</p>
				<p>
					--{comment.author}, &nbsp;
					{new Intl.DateTimeFormat('en-US', {
						year: 'numeric',
						month: 'short',
						day: '2-digit'
					}).format(new Date(comment.date))}
				</p>
			</li>
		);
	});

	return (
		<div className="col-12 col-lg-5 m-2">
			<h3>Comments</h3>
			<ul className="list-unstyled">{com}</ul>
		</div>
	);
}

const DishDetail = (props) => {
	const dish = props.dish;

	if (dish == null) {
		return <div />;
	}

	const Dish = renderDish(dish);
	const Comment = renderComments(dish.comments);
	return (
		<div className="container">
			<div className="row">
				{Dish}
				{Comment}
			</div>
		</div>
	);
};

export default DishDetail;
