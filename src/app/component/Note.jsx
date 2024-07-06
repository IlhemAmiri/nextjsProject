import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import StarRating1 from './StarRating1';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const quarterStar = (rating % 1) >= 0.25 && (rating % 1) < 0.5;
    const halfStar = (rating % 1) >= 0.5 && (rating % 1) < 0.75;
    const threeQuarterStar = (rating % 1) >= 0.75;
    const emptyStars = 5 - fullStars - (quarterStar || halfStar || threeQuarterStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {Array(fullStars).fill(0).map((_, index) => (
                <svg key={index} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z" />
                </svg>
            ))}
            {quarterStar && (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="quarterGrad">
                            <stop offset="25%" stopColor="currentColor" className="text-yellow-500" />
                            <stop offset="25%" stopColor="currentColor" className="text-gray-300" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#quarterGrad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z" />
                </svg>
            )}
            {halfStar && (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="halfGrad">
                            <stop offset="50%" stopColor="currentColor" className="text-yellow-500" />
                            <stop offset="50%" stopColor="currentColor" className="text-gray-300" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#halfGrad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z" />
                </svg>
            )}
            {threeQuarterStar && (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="threeQuarterGrad">
                            <stop offset="75%" stopColor="currentColor" className="text-yellow-500" />
                            <stop offset="75%" stopColor="currentColor" className="text-gray-300" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#threeQuarterGrad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z" />
                </svg>
            )}
            {Array(emptyStars).fill(0).map((_, index) => (
                <svg key={index} className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.167a1 1 0 00.95.69h4.389c.969 0 1.372 1.24.588 1.81l-3.557 2.581a1 1 0 00-.364 1.118l1.358 4.167c.3.921-.755 1.688-1.54 1.118l-3.557-2.581a1 1 0 00-1.175 0l-3.557 2.581c-.784.57-1.838-.197-1.54-1.118l1.358-4.167a1 1 0 00-.364-1.118L2.064 9.594c-.784-.57-.381-1.81.588-1.81h4.389a1 1 0 00.95-.69l1.357-4.167z" />
                </svg>
            ))}
        </div>
    );
};

const Note = ({ note }) => {
    const [client, setClient] = useState({ firstName: '', lastName: '' });
    const userId = localStorage.getItem('userId');
    const authStatus = localStorage.getItem('isAuth') === 'true';
    const [error, setError] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updatedRating, setUpdatedRating] = useState(note.note);
    const [updatedComment, setUpdatedComment] = useState(note.commentaire);


    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:3001/users/clients/${note.idClient}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setClient(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the client data!", error);
            });
    }, [note.idClient]);
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/notes/${note._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Delete response:', response);
            window.location.reload();
        } catch (err) {
            console.error('Delete error:', err);
            setError('Failed to delete note');
        }
    };
    const handleUpdateSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/notes/${note._id}`, {
                note: updatedRating,
                commentaire: updatedComment
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Update response:', response);
            setShowUpdateForm(false);
            window.location.reload();
        } catch (err) {
            console.error('Update error:', err);
            setError('Failed to update note');
        }
    };
    return (
        <div className="border rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
                <img src={note.idClient.image} alt="Profile" className="rounded-full w-12 h-12 mr-4" />
                <span className="font-semibold text-[25px]">{note.idClient.nom} {note.idClient.prenom}</span>
                {authStatus && note.idClient._id === userId && (
                    <>
                        <button
                            onClick={handleDelete}
                            className="ml-auto bg-red-500 text-white text-center px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                            onClick={() => setShowUpdateForm(true)}
                            className="ml-2 bg-[#1ECB15] text-white text-center px-4 py-2 rounded-full shadow-md hover:bg-green-700 transition cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </>
                )}
            </div>
            <StarRating rating={note.note} />
            {note.commentaire && (
                <div className="mt-2">
                    <span className="font-semibold">Commentaire:</span> {note.commentaire}
                </div>
            )}
            {error && <div className="text-red-500 mt-2">{error}</div>}

            {showUpdateForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Your Rating</h2>
                        <label className="block mb-2">
                            <span className="text-gray-700 font-medium">Rating (1-5):</span>
                            <StarRating1 rating={updatedRating} setRating={setUpdatedRating} />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700 font-medium">Comment:</span>
                            <textarea
                                value={updatedComment}
                                onChange={(e) => setUpdatedComment(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </label>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowUpdateForm(false)}
                                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateSubmit}
                                className="px-4 py-2 bg-[#1ECB15] text-white rounded hover:bg-[#17a612]"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Note;
