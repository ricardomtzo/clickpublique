
import React, { useRef } from "react";
import { Stepper, StepperRefAttributes } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
//import { Button } from 'primereact/button';
import { Col } from "./Grids";
import { Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { isMobile } from "@/config/utils";

export default function StteperCustom({ contents }: any) {
    const stepperRef = useRef<any>(null);

    const windowWidth = () => {
        if (typeof window !== "undefined") {
            return window.innerWidth;
        }else{
            return 0
        }
    }
    
    return (
        <Col sx={{ width: isMobile() ? windowWidth() - 50 : '100%'}}>
            <Stepper ref={stepperRef} orientation={isMobile() ? 'horizontal' : 'vertical'}>

                {contents?.map((item: any, index: number) => (
                    <StepperPanel header={item.header} key={index} >
                        <div className="flex flex-column h-12rem ">
                            {item.content}
                        </div>
                        <div className="flex py-4">
                            {index > 0 &&
                                <Button
                                    className="mr-2"
                                    variant="contained" startIcon={<ArrowBack />}
                                    onClick={() => stepperRef.current.prevCallback()} >
                                    Voltar
                                </Button>}


                            {index < contents.length - 1 &&
                                <Button
                                    variant="contained"
                                    endIcon={<ArrowForward />}
                                    onClick={() => stepperRef.current.nextCallback()}>
                                    Próximo
                                </Button>}
                        </div>
                    </StepperPanel>
                ))}

            </Stepper>
        </Col>
    )
}
