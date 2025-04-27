import ClassScrollBar from "@/components/classScrollBar.jsx";

const ClassContent = ({
  danceClassMDC,
  danceClassTMILLY,
  danceClassML,
  danceClassEIGHTYEIGHT,
  danceClassPLAYGROUND,
  searchTerm,
}) => (
  <div className="flex-1 flex justify-center pt-2 w-full min-w-25 overflow-x-auto mx-10">
    <ClassScrollBar
      studioName="PLAYGROUND"
      danceClassList={danceClassPLAYGROUND}
      isSearchTerm={Boolean(searchTerm?.trim())}
    />
    <ClassScrollBar
      studioName="MDC"
      danceClassList={danceClassMDC}
      isSearchTerm={Boolean(searchTerm?.trim())}
    />
    <ClassScrollBar
      studioName="TMILLY"
      danceClassList={danceClassTMILLY}
      isSearchTerm={Boolean(searchTerm?.trim())}
    />
    <ClassScrollBar
      studioName="ML"
      danceClassList={danceClassML}
      isSearchTerm={Boolean(searchTerm?.trim())}
    />
    <ClassScrollBar
      studioName="EIGHTYEIGHT"
      danceClassList={danceClassEIGHTYEIGHT}
      isSearchTerm={Boolean(searchTerm?.trim())}
    />
  </div>
);

export default ClassContent;
