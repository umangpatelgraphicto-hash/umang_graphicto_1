export const SubscriptionTab: React.FC = () => {
    const handleApplyPromoCode = () => {
      console.log("Promo code applied!");
      alert("Promo code applied successfully!");
    };
  
    return (
      <div className="bg-white w-full lg:w-2/3 p-4 lg:p-6 rounded shadow-md">
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Promo Code Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-grow w-full sm:w-auto p-2 border border-gray-300 rounded-md"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
              onClick={handleApplyPromoCode}
            >
              Apply
            </button>
          </div>
  
          {/* Subscription Status Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-4">
            <p className="text-gray-700 font-medium">You are currently on Basic plan</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto mt-4 sm:mt-0">
              Cancel
            </button>
          </div>
  
          {/* Upgrade Section */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-700">Upgrade to Premium plan and unlock great features!</p>
            <button className="bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto">
              Upgrade to Premium
            </button>
          </div>
  
          {/* Receipts Section */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-700">You have no recent receipts.</p>
          </div>
        </div>
      </div>
    );
  };
  