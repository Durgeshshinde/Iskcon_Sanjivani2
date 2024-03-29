"use client";
import useWindowDimensions from "@/Utils/Hooks/WindowDimentions";
import LoadingComponent from "@/Utils/Icons/LoadingComponent";
import { useGlobalState } from "@/Utils/State";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ViewController from "./ViewController";
import LoadingSkeleton from "@/Utils/LoadingSkeleton";
import VolunteerData from "./VolunteerData";
import Modal from "@/Utils/Modal";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { HidableColumns } from "@/Utils/TableUtils/HidableColumns";

const audienceType = ["all", "children", "boys", "girls", "family"];

interface ProgramsData {
  name: string;
  preacher: string;
  coordinator: string;
  mentor: string;
  incharge: string;
  type: string;
  audienceType: string;
  location: string;
}

const Programs: React.FC<responseDataFetched<ProgramsData>> = ({
  response,
}) => {
  const { state, dispatch } = useGlobalState();
  const [columnNamesArr, setColumnNamesArr] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const [programCreation, setProgramCreation] = useState(false);

  const [customisationObjs, setCustomisationObjs] = useState({
    cellSize: "normal",
  });

  function handleCustomisation(object: any) {
    setCustomisationObjs((prevState) => ({
      ...prevState,
      ...object,
    }));
  }

  const handleAddItemToColumnNameArr = (option: { value: string }) => {
    if (columnNamesArr.includes(option.value)) {
      setColumnNamesArr(
        columnNamesArr.filter((selected) => selected !== option.value)
      );
    } else {
      setColumnNamesArr([...columnNamesArr, option.value]);
    }
  };
  return (
    <div className={`min-h-screen`}>
      <div className="my-3 flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-5">
          <button
            className={`my-3 px-4 py-2 text-lg rounded-xl font-semibold ${
              state.theme.theme === "LIGHT"
                ? "bg-blue-50 text-blue-500"
                : "bg-blue-950 bg-opacity-40 text-blue-300"
            }`}
            onClick={() => setProgramCreation(true)}
          >
            + Program
          </button>
          <ViewController
            handleCustomisation={handleCustomisation}
            handleHidables={handleAddItemToColumnNameArr}
            columnNames={[
              { columnName: "PROGRAM NAME", field: "Program_Name" },
              { columnName: "PREACHER", field: "Program_Preacher" },
              { columnName: "COORDINATOR", field: "Program_Coordinator" },
              { columnName: "MENTOR", field: "Program_Mentor" },
              { columnName: "INCHARGE", field: "Program_Incharge" },
              { columnName: "TYPE", field: "Program_Type" },
              { columnName: "AUDIENCE TYPE", field: "Program_AudienceType" },
              { columnName: "LOCATION", field: "Program_Location" },
            ]}
            options={columnNamesArr}
          />
        </div>
      </div>
      {isLoading ? (
        <>
          <LoadingSkeleton
            rows={8}
            columns={width < 600 ? 3 : 8}
            theme={state.theme.theme}
          />
        </>
      ) : (
        <div
          className={`w-full mx-auto rounded-3xl ${
            state.theme.theme === "LIGHT" ? "bg-gray-50" : "bg-stone-900"
          } p-4`}
        >
          <div className={`overflow-x-auto`}>
            <table className="w-full">
              <thead>
                <tr
                  className={` ${
                    state.theme.theme === "LIGHT"
                      ? "border-b-2 border-gray-400 "
                      : "border-b-2 border-stone700"
                  }`}
                >
                  <HidableColumns
                    ColumnToHide="Program_Name"
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                  >
                    PROGRAM NAME
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Program_Preacher"
                  >
                    PREACHER
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Program_Coordinator"
                  >
                    COORDINATOR
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Program_Mentor"
                  >
                    MENTOR
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Program_Incharge"
                  >
                    INCHARGE
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Program_Type"
                  >
                    TYPE
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Program_AudienceType"
                  >
                    AUDIENCE TYPE
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                    ColumnToHide="Program_Location"
                  >
                    LOCATION
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                  >
                    ACTIVITIES LINK
                  </HidableColumns>
                  <HidableColumns
                    isColumnHeader={true}
                    stylesClassNames=" whitespace-nowrap font-bold px-5 pb-3"
                    columnNamesArray={columnNamesArr}
                  >
                    SADHANA LINK
                  </HidableColumns>
                </tr>
              </thead>
              <tbody>
                {response.content.length > 0 ? (
                  response.content.map((item: ProgramsData, index) => (
                    <tr key={index}>
                      <HidableColumns
                        ColumnToHide="Program_Name"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        {item.name}
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Program_Preacher"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        <VolunteerData volunteerid={item.preacher} />
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Program_Coordinator"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center border-b ${
                          customisationObjs.cellSize === "normal"
                            ? "py-2"
                            : customisationObjs.cellSize === "bigger"
                            ? "py-3"
                            : "py-5"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        <VolunteerData volunteerid={item.coordinator} />
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Program_Mentor"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        <VolunteerData volunteerid={item.mentor} />
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Program_Incharge"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        <VolunteerData volunteerid={item.incharge} />
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Program_Type"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        {item.type}
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Program_AudienceType"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        {item.audienceType}
                      </HidableColumns>
                      <HidableColumns
                        ColumnToHide="Program_Location"
                        isColumnHeader={false}
                        columnNamesArray={columnNamesArr}
                        stylesClassNames={`text-center border-b ${
                          customisationObjs.cellSize === "bigger"
                            ? "py-2"
                            : customisationObjs.cellSize === "biggest"
                            ? "py-3"
                            : "py-1"
                        } ${
                          state.theme.theme === "LIGHT"
                            ? "border-b-gray-200"
                            : "border-b-stone-800"
                        }`}
                      >
                        {item.location}
                      </HidableColumns>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center py-10">
                      No Data To Show
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <AddProgram
        isOpen={programCreation}
        onClose={() => setProgramCreation(false)}
      />
    </div>
  );
};

export default Programs;

function AddProgram({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { state, dispatch } = useGlobalState();
  const [incharge, setInCharge] = useState(0);
  const [volunteersArr, setVolunteersArr] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/admin/information/volunteers");
        if (response.ok) {
          const responseData = await response.json();
          setVolunteersArr(responseData.content.content);
        } else {
          const errorData = await response.json();
          dispatch({
            type: "SHOW_TOAST",
            payload: { message: errorData.message, type: "ERROR" },
          });
        }
      } catch (error: any) {
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: error.message },
        });
      }
    })();
  }, [dispatch]);

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div
        className={`md:p-5 p-3 rounded-3xl shadow-xl ${
          state.theme.theme === "LIGHT"
            ? "bg-gray-50 shadow-gray-300"
            : "bg-stone-900 shadow-stone-950"
        }`}
      >
        <h1
          className={`text-2xl font-bold border-b-2 pb-3 ${
            state.theme.theme === "LIGHT"
              ? "border-b-gray-300"
              : "border-b-stone-700"
          }`}
        >
          Create Program
        </h1>
        <div className="lg:w-[40vw] md:w-[60vw] w-[95vw] max-h-[80vh] overflow-y-auto custom-scrollbar px-1">
          <form action="" className="mt-5 w-full">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Program_Name"
                  id="name"
                >
                  Program Name
                </label>
                <input
                  type="text"
                  name="name"
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                  id="Program_Name"
                  placeholder="Gitasar Batch 12"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Program_Description"
                >
                  Program Description
                </label>
                <textarea
                  name="description"
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                  id="Program_Description"
                  placeholder="something description"
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Incharge</label>
                  <MenuIconAndDropDown
                    setSelected={(value) => setInCharge(value)}
                    DataArr={volunteersArr}
                    position="down"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Coordinator</label>
                  <MenuIconAndDropDown
                    setSelected={(value) => setInCharge(value)}
                    DataArr={volunteersArr}
                    position="down"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Preacher</label>
                  <MenuIconAndDropDown
                    setSelected={(value) => setInCharge(value)}
                    DataArr={volunteersArr}
                    position="up"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Mentor</label>
                  <MenuIconAndDropDown
                    setSelected={(value) => setInCharge(value)}
                    DataArr={volunteersArr}
                    position="up"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Audience Type</label>
                  <MenuOthersDropDown
                    setSelected={(value) => console.log(value)}
                    DataArr={audienceType}
                    position="up"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-lg">Program Type</label>
                  <MenuOthersDropDown
                    setSelected={(value) => console.log(value)}
                    DataArr={[
                      "Temple program",
                      "Society Program",
                      "College Program",
                    ]}
                    position="up"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="font-semibold text-lg"
                  htmlFor="Program_Location"
                  id="location"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  className={`rounded-xl px-4 py-2 text-lg border transition-all duration-500 ${
                    state.theme.theme === "LIGHT"
                      ? "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-100 bg-white"
                      : "focus:border-blue-600 outline-none focus:ring-4 focus:ring-blue-950 bg-stone-950 border-stone-800"
                  }`}
                  id="Program_Location"
                  placeholder="Program Location"
                />
              </div>
              <div className="flex items-center justify-between md:gap-5 gap-3 mt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className={`text-red-600 font-semibold text-xl w-full py-2 rounded-xl ${
                    state.theme.theme === "LIGHT"
                      ? "bg-red-50"
                      : "bg-red-900 bg-opacity-20"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`text-blue-600 font-semibold text-xl w-full py-2 rounded-xl ${
                    state.theme.theme === "LIGHT"
                      ? "bg-blue-50 "
                      : "bg-blue-900 bg-opacity-20"
                  }`}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

interface PropsMenu<T> {
  setSelected: (state: T) => void;
  DataArr: T[];
  defaultVal?: string;
  position: string;
}

function MenuIconAndDropDown<T>({
  setSelected,
  DataArr,
  defaultVal,
  position,
}: PropsMenu<T>) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  useEffect(() => {
    if (defaultVal) {
      setSelectedOption(defaultVal);
    }
  }, [defaultVal]);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isSelectionOpen) {
      // Open modal animation
      setTimeout(() => {
        setModalStyle({
          transform: "scale(1)",
          opacity: 1,
        });
      }, 50); // Delay the transition slightly for better visual effect
    } else {
      // Close modal animation
      setModalStyle({
        transform: "scale(0.95)",
        opacity: 0,
      });
      setTimeout(() => {
        setIsClosing(false);
      }, 3000); // Adjust this duration according to your transition duration
    }
  }, [isSelectionOpen]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    toggleSelection(false);
  }, [toggleSelection]);

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection, closeModal]);
  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
          state.theme.theme === "LIGHT"
            ? "border-gray-300 bg-white focus:ring-blue-100 focus:border-blue-600"
            : "border-stone-700 bg-stone-950 focus:ring-blue-950 focus:border-blue-600"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[10000] ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-700"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {DataArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map((item: any, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(
                      item.initiatedName
                        ? item.initiatedName
                        : `${item.firstName} ${item.lastName}`
                    );
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {item.initiatedName
                    ? item.initiatedName
                    : `${item.firstName} ${item.lastName}`}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              <p>No data to show</p>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
function MenuOthersDropDown({
  setSelected,
  DataArr,
  defaultVal,
  position,
}: {
  setSelected: (value: string) => void;
  DataArr: string[];
  defaultVal?: string;
  position?: string;
}) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  useEffect(() => {
    if (defaultVal) {
      setSelectedOption(defaultVal);
    }
  }, [defaultVal]);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isSelectionOpen) {
      // Open modal animation
      setTimeout(() => {
        setModalStyle({
          transform: "scale(1)",
          opacity: 1,
        });
      }, 50); // Delay the transition slightly for better visual effect
    } else {
      // Close modal animation
      setModalStyle({
        transform: "scale(0.95)",
        opacity: 0,
      });
      setTimeout(() => {
        setIsClosing(false);
      }, 3000); // Adjust this duration according to your transition duration
    }
  }, [isSelectionOpen]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    toggleSelection(false);
  }, [toggleSelection]);

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection, closeModal]);
  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
          state.theme.theme === "LIGHT"
            ? "border-gray-300 bg-white focus:ring-blue-100 focus:border-blue-600"
            : "border-stone-700 bg-stone-950 focus:ring-blue-950 focus:border-blue-600"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[10000] ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-700"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {DataArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map((item: any, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(item);
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              <p>No data to show</p>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
