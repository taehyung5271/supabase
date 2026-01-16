import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";

export default function PostCreatePage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const queryClient = useQueryClient();//mutate를 사용하기 위해

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            //성공할 경우 queryClient 캐시를 갱신시켜주기
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            //갱신시켜주고 홈으로 가기
            navigate('/')
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //createPost안에 타입인 title과 content가 변경된다?
        mutation.mutate({ title, content })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목"
                required
            />
            <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용"
                required
            />
            <button disabled={mutation.isPending}>작성</button>
        </form>
    )
}

//내가 모르는개념 dispatch,provider