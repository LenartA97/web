import { useEffect, useState} from "react";
import { useParams,useNavigate } from "react-router-dom";
import "../button.css";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo)
            });
        });
    }, [id]);

    const deletePost = async () => {
        try {
            const response = await fetch(`http://localhost:4000/post/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Sikeresen törlődött');
                navigate('/');
            } else {
                alert('Error');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Error deleting post');
        }
    };

    if (!postInfo) return '';

    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <button className="deleteButton" onClick={deletePost}>Törlés</button>
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt=''/>
            </div>
            <div className="conten" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    );
}