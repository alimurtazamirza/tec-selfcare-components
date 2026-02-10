import {useEffect} from "react";
import * as  defaultTranslation from "@/core";
import {useHttp, useAppContext, responseToObject} from "@/hooks";

const useTranslations = (language = "en") => {
    const {translations, setLoading, setTranslations} = useAppContext();
    const {postAPI} = useHttp();


    useEffect(() => {
        const fetchTranslations = async (language) => {
            setLoading(true);
            postAPI({
                endPoint: "/content-service/api/translation/get", requestData: {}, headers: {Language: language},
            })
                .then(({data}) => {
                    setTranslations({...responseToObject(data?.translations)})
                }).catch((res) => {
                console.log('error', res, res.error)
            }).finally(() => {
                setLoading(false);
            });
        };

        fetchTranslations();
    }, [language]);

    let response = {};
    if (typeof query === "string") {
        response[query] = {
            ...defaultTranslation?.[query],
            ...translations?.[query],
        };
    } else if (Array.isArray(query)) {
        query.forEach((key) => {
            response[key] = {
                ...defaultTranslation?.[key],
                ...translations?.[key],
            };
        });
    }
    return response;
};

export default useTranslations;
