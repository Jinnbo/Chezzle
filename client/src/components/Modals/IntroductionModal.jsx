import React from "react";

export const IntroductionModal = ({BTNTitle}) => {
    const [showModal, setShowModal] = React.useState(true);

    const handleFormSubmit = (event) => {
        event.preventDefault(); 
        setShowModal(false)
    };

    return (
        <>
            <button class="button" type='button' onClick={() => setShowModal(true)}>
            <span class="button-content">{BTNTitle}</span>
            </button>
            {showModal ? (
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 ">
                    <div className="relative w-auto my-6 mx-auto max-w-[50vw] modalContainer">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold text-black  modalTitle">
                                    Welcome &#128075;
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="bg-transparent text-black h-10 w-10 text-2xl block outline-none focus:outline-none">
                                    ×
                                    </span>
                                </button>
                            </div>

                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                    Welcome to Chezzle! Most of the app is still in development and currently only supports Mate in 1 puzzles but 
                                    there will be more coming soon. 
                                    <br/>
                                    <br/>
                                    To get started, simply press the 'Start' button to begin your puzzle-solving journey. You can navigate through the puzzles using the arrow keys.
                                    <br/>
                                    <br/>
                                    Stay tuned for the latest updates on the GitHub page: https://github.com/Jinnbo/Chezzle.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}