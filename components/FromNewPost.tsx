"use client";

import { FormData } from "@/types/blogs";
import { ChangeEvent, FormEvent, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const FromNewPost = () => {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        content: "",
    });
    const { data } = useSession();
    const router = useRouter();


    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        e.preventDefault();
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("api/posts", formData);
            if (response.status === 200) {
                router.push(`/blogs/${response.data.newPost.id}`);
            }

            console.log(response)

        } catch (error) {
            throw new Error("Axios Post Error :(");
        }
        setFormData({
            title: "",
            content: "",
        });
    };

    return (
        <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
            <h2 className="text-center text-orange-600 font-bold mb-2">First SignIn to write a post</h2>
            <div className="mb-4">
                <input
                    className="w-full text-orange-700  py-2 px-3 border border-gray-600 rounded-md focus:outline-none focus:ring focus:border-gray-800  "
                    type="text"
                    required
                    placeholder="Enter Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <textarea
                    className="w-full text-orange-700 h-[240px] py-2 px-3 border border-gray-600 rounded-md focus:outline-none focus:ring focus:border-gray-800"
                    placeholder="Write your post"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                />
            </div>
            <button
                disabled={!data?.user?.email || !formData.title || !formData.content}
                type="submit"
                className="px-8 py-4 w-full rounded-md bg-amber-800 text-amber-100 text-xl hover:bg-orange-700 transition-colors disabled:bg-gray-600"
            >
                post
            </button>
        </form>
    );
};
export default FromNewPost;
