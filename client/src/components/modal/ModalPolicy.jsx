import React, { useEffect } from "react";
import { getPolices } from "../../redux/actions/policiesAction";
import { useDispatch, useSelector } from "react-redux";

const ModalPolicy = ({ handleOpenPolicy, setAcceptPolicy, acceptPolicy }) => {
  const policies = useSelector((state) => state.policiesReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPolices());
  }, [dispatch]);

  return (
    <div className="fixed inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center z-[99999]">
      <div className="bg-white w-[600px] h-[600px] p-6 rounded-lg shadow-md">
        <p className="text-3xl font-semibold mb-4 text-black">Policy</p>
        {/* Policy */}
        <div className={`custom-scroll-container`} style={{ height: "420px" }}>
          <div className="custom-scroll-content h-100 overflow-auto">
            <ol className="list-decimal px-3">
              {policies.length > 0 &&
                policies.map((policy) => (
                  <li className="mb-4 text-black" key={policy.id}>
                    <p className="text-md">{policy.content}</p>
                  </li>
                ))}
            </ol>
          </div>
        </div>

        <div className="flex">
          <input
            type="checkbox"
            checked={acceptPolicy}
            onChange={() => setAcceptPolicy(!acceptPolicy)}
            className="mr-2"
          />
          <div
            className="text-md text-blue-500 underline cursor-pointer my-2"
            onClick={() => handleOpenPolicy()}>
            Accept policy and terms of service here.
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ml-auto mr-2"
            onClick={() => handleOpenPolicy(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPolicy;
