import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./form-dialog.scss";

// radio button dependencies
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function FormDialog() {
	const [open, setOpen] = React.useState(false);

	let confirmVisible = false;
	let findAccountInfoForm;

	function handleClickOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	function findAccountInfo() {
		findAccountInfo = (
			<RadioGroup>
				<FormControlLabel
					value="female"
					control={<Radio color="primary" />}
					label="Female"
					labelPlacement="start"
				/>
			</RadioGroup>
		);
		confirmVisible = true;
		console.log(confirmVisible);
	}
	// functionality or functions goes here. you can insert an if statement here

	return (
		<div class="form-dialog-container">
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Set Now
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title set-price-dialog-header">
					Set Project Pricing{" "}
					<Button id="set-price-close-button" onClick={handleClose} color="primary">
						<i class="fa fa-window-close fa-2x" aria-hidden="true" />
					</Button>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<p class="dummy-text">
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text ever
							since the 1500s, when an unknown printer.
						</p>
					</DialogContentText>
					{/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
					<input
						type="text"
						id="exampleForm2"
						class="form-control project-setup-form-control"
						placeholder="Enter Your Project Name"
					/>
					<div class="container project-name-input-container">
						<input
							type="text"
							id="exampleForm2"
							class="form-control project-setup-form-control"
							placeholder="Enter Your Project Name"
						/>
						<button
							type="button"
							class="btn btn-outline-primary project-name-search-button set-price-search-icon"
						>
							<i class="fa fa-search project-setup-search-icon" />
						</button>
					</div>
					<input
						type="text"
						id="exampleForm2"
						class="form-control project-setup-form-control"
						placeholder="Enter Your Project Name"
					/>
					<button
						onClick={findAccountInfo}
						type="button"
						class="btn btn-primary find-account-info-button"
					>
						Find Account Info
					</button>

					<RadioGroup className="set-pricing-radio-group">
						<FormLabel className="set-pricing-radio-group-label">
							Pricing Type:
						</FormLabel>

						<FormControlLabel
							class="set-pricing-radio-input"
							value="Account Plus"
							control={<Radio color="primary" />}
							label="Account Plus"
							labelPlacement="start"
						/>
						<FormControlLabel
							class="set-pricing-radio-input"
							value="MSRP Down"
							control={<Radio color="primary" />}
							label="MSRP Down"
							labelPlacement="start"
						/>
						<FormControlLabel
							class="set-pricing-radio-input"
							value="Another Account"
							control={<Radio color="primary" />}
							label="Another Account"
							labelPlacement="start"
						/>
					</RadioGroup>
					<div class="form-check set-pricing-checkbox">
						<input type="checkbox" class="form-check-input" id="materialUnchecked" />
						<label class="form-check-label" for="materialUnchecked">
							Show Pricing
						</label>
					</div>
					{/* <div class="container"> */}
					<div class="row find-account-info-input-group">
						<input
							type="text"
							id="exampleForm2"
							class="form-control set-pricing-account-input-1"
							placeholder="Enter Your Project Name"
						/>
						<input
							type="text"
							id="exampleForm2"
							class="form-control set-pricing-account-input-2"
							placeholder="Enter Your Project Name"
						/>
						{/* <button type="button" class="btn btn-outline-primary">
							<i class="fa fa-search" />
						</button> */}

						<button
							type="button"
							class="btn btn-outline-primary find-account-info-search-button"
						>
							<i class="fa fa-search" />
						</button>
						<button
							onClick={findAccountInfo}
							type="button"
							class="btn btn-primary set-price-confirm-button"
						>
							Confirm
						</button>
					</div>

					{/* </div> */}
				</DialogContent>
				{/* <DialogActions>
					<Button onClick={handleClose} color="primary">
						close
					</Button>
					<Button onClick={handleClose} color="primary">
						Confirm
					</Button>
				</DialogActions> */}
			</Dialog>
		</div>
	);
}
