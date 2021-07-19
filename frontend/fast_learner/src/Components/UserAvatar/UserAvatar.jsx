import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../Actions';

import default_avatar from '../../Assets/Images/default-avatar.png';

const UserAvatar = ({avatar, updateAvatar}) => {
    const [uploadedPhoto, setUploadedPhoto] = useState(null);
    const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);

    const handleFilesUpload = (file) => {
		const reader = new FileReader();
		
		reader.onloadend = () => {
			const imageUrl = window.URL.createObjectURL(file);
			
			setUploadedPhoto(file);
			setUploadedPhotoUrl(imageUrl);
            updateAvatar(file);
		}
		
		if (file) {
			reader.readAsDataURL(file);
		}
	}

    const handlePhotoChange = (event) => {
		event.preventDefault()
		const files = event.target.files;
		
		handleFilesUpload(files[0]);
    }

    const getImageSource = () => {
        if (uploadedPhotoUrl) {
            return uploadedPhotoUrl;
        }

        if (avatar) {
            return avatar;
        }

        return default_avatar;
    }

    return (
        <div className="avatar">
            <img src={getImageSource()} alt="user" className="user-img"/>
            <div class="file btn btn-lg btn-primary">
                Change Photo
                <input type="file" name="file" onChange={handlePhotoChange}/>
            </div>
    </div>
    );
}

const actionCreators = {
    updateAvatar: userActions.updateAvatar
}

const connectedUserAvatar = connect(() => {}, actionCreators)(UserAvatar);
export { connectedUserAvatar as UserAvatar };