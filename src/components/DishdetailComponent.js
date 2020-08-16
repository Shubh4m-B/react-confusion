import React, { Component } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Button,
	Breadcrumb,
	BreadcrumbItem,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	Row,
	Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

// function to render the selected dish
function RenderDish({ dish }) {
	if (dish != null) {
		return (
			<div className="col-12 col-md-5 m-2">
				<Card>
					<CardImg width="100%" src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle> {dish.name} </CardTitle>
						<CardText> {dish.description} </CardText>
					</CardBody>
				</Card>
			</div>
		);
	} else {
		return <div />;
	}
}

// function to render all the comments corresponding to the selected dish
function RenderComments({ comments }) {
	if (comments != null) {
		const cmnts = comments.map((commnts) => {
			return (
				<ul key={commnts.id} className="list-unstyled">
					<li>
						<p> {commnts.comment} </p>
						<p>
							{' '}
							-- {commnts.author}, &nbsp;
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: 'short',
								day: '2-digit'
							}).format(new Date(Date.parse(commnts.date)))}
						</p>
					</li>
				</ul>
			);
		});

		return (
			<div className="col-12 col-md-5 m-2">
				<h4> Comments </h4>
				{cmnts}
				<CommentForm />
			</div>
		);
		// if comments is empty
	} else {
		return <div />;
	}
}

// Comment Form class Component to render the user comment form
class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleSubmit(values) {
		this.toggleModal();

		console.log('Current State is: ' + JSON.stringify(values));
		alert('Current State is: ' + JSON.stringify(values));
	}

	render() {
		return (
			<div>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-edit fa-lg" />Submit Comment
				</Button>

				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label for="rating" md={12}>
									Rating
								</Label>
								<Col md={12}>
									<Control.select model=".rating" id="rating" name="rating" className="form-control">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="author" md={12}>
									Your Name
								</Label>
								<Col md={12}>
									<Control.text
										model=".author"
										id="author"
										name="author"
										placeholder="Author"
										className="form-control"
										validators={{ required, minLength: minLength(2), maxLength: maxLength(15) }}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											required: 'Required',
											minLength: 'Must be greater than 2 characters',
											maxLength: 'Must be 15 charaters or less'
										}}
									/>
								</Col>
							</Row>

							<Row className="form-group">
								<Label htmlFor="feedback" md={12}>
									Your feedback
								</Label>
								<Col md={12}>
									<Control.textarea
										model=".comment"
										id="comment"
										name="comment"
										resize="none"
										rows="6"
										className="form-control"
									/>
								</Col>
							</Row>

							<Button type="submit" value="submit" color="primary">
								Submit
							</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const DishDetail = (props) => {
	if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderDish dish={props.dish} />
					<RenderComments comments={props.comments} />
				</div>
			</div>
		);
	} else {
		return <div />;
	}
};

export default DishDetail;
