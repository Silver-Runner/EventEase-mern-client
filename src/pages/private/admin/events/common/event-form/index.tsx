import { useNavigate, useParams } from "react-router-dom";
import { uploadFileAndReturnUrl } from "../../../../../../api-services/storage-service";
import General from "./general";
import LocationDate from "./location-date";
import Media from "./media";
import Tickets from "./tickets";
import { Form, message, Steps } from "antd";
import { useState } from "react";
import { createEvent, updateEvent } from "../../../../../../api-services/events-service";


export interface EventFormStepProps {
  eventData : any ;
  setEventData : any ;
  setCurrentStep : any;
  currentStep : number;
  selectedMediaFiles?: any;
  setSelectedMediaFiles?: any;
  loading?: boolean;
  onFinish?: any;
}

const EventForm = ({
  initialData = {},
  type = "create",
}: {
  initialData?: any;
  type?: "create" | "edit";
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData , setEventData] = useState<any>(initialData)
  const [loading, setLoading] = useState(false);
  const [selectedMediaFiles, setSelectedMediaFiles] = useState([]);
  const params: any = useParams();
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      setLoading(true);
      const [...urls] = await Promise.all(
        selectedMediaFiles.map(async (file: any) => {
          return await uploadFileAndReturnUrl(file);
        })
      );
      eventData.media = [...(eventData?.media || []), ...urls];
      if (type === "edit") {
        await updateEvent(params.id, eventData);
        message.success("Event updated successfully");
      } else {
        await createEvent(eventData);
        message.success("Event created successfully");
      }

      navigate("/admin/events");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const commonProps = {
    eventData,
    setEventData,
    setCurrentStep,
    currentStep,
    selectedMediaFiles,
    setSelectedMediaFiles,
    loading,
    setLoading,
    onFinish,
  }

  const stepData = [
    { name: "General", component: <General {...commonProps}/> },
    {
      name: "Location & Date",
      component: <LocationDate
      {...commonProps} />,
    },
    {
      name: "Media",
      component: <Media {...commonProps}/>,
    },
    {
      name: "tickets",
      component: <Tickets {...commonProps}/>,
    },
  ];
  return <Form layout="vertical">
    <Steps current={currentStep}
    onChange={(step) => setCurrentStep(step)}>
      {stepData.map((step, index) => (
        <Steps.Step key={index} title={step.name}
        disabled={index> currentStep} />
      ))}
    </Steps>
   <div className="mt-5">
   {stepData[currentStep].component}
   </div>

  </Form>;
};

export default EventForm;
